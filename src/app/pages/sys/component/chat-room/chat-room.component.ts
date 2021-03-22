import { AfterViewInit, Component,OnInit,  ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { Store } from '@ngrx/store';
import { getUser, getUserState } from 'src/app/store/app-selector';
import { User } from 'src/app/services/data-typs/data';
import { NzMessageService } from 'ng-zorro-antd/message';


type messageType = {
  title:string,
  name:string
}

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {


  @ViewChild('scrollComponent')
  _scrollViewport: CdkVirtualScrollViewport;

  data:messageType[];

  message:string;

  user:User;

  ws:WebSocket = null;
  url:string = 'ws://192.168.1.191:25555';
  lockReconnect:boolean;
  constructor(
    private store$:Store<AppStoreModule>,

  ) { 
   
  }




  ngOnInit(): void {

    this.data = [
      //{title:"ni ",name:"",touxiang:'a'}
    ];
    this.store$.select(getUserState,getUser).subscribe(userState=>{
      this.user = userState.user;
      this.createObservableSocket();
    });
   
    
  }


  createObservableSocket(){

    if(this.ws === null){
      this.ws = new WebSocket(this.url);
    }
    //连接建立的回调函数
    this.ws.onopen = ()=>{
      console.log('打开连接');
      const msg = {title:'--->加入聊天室',name:this.user.userName}
      this.sendMessages(msg);

    }

    //客户端收到服务器消息的时候就会执行这个回调方法
    this.ws.onmessage = (event)=> {
      console.log("接受消息",event.data)
      const msg:messageType = JSON.parse(event.data);
      this.data.push(msg);
     };

    //连接出错的回调函数
    this.ws.onerror = (event)=>{
      const msg = {title:'-->连接错误' ,name:this.user.userName};
      this.sendMessages(msg);
      this.reConnect();
    };
 
     //连接断掉的回调函数
    this.ws.onclose = (event)=>{
      const msg = {title:'->断开连接' ,name:this.user.userName};
      this.sendMessages(msg);
      this.reConnect();
    };
  }

  //重连
  reConnect() {
    console.log("断线重连");
    if (this.lockReconnect){
      return;
    }
    this.lockReconnect = true;
    setTimeout(()=>{
      this.lockReconnect = false;
    },1000);
  
  }

  send(){
    if(this.message!== ''){
      const msg :messageType= {title:this.message,name:this.user.userName};
      console.log('msg',msg);
      this.sendMessages(msg);
      this.message='';
    }
    
  }



  

  ngAfterViewInit(): void {
    console.log(this._scrollViewport)
    this._scrollViewport.scrollToIndex(5);
  }



  sendMessages(message: messageType) {
    if(this.ws){
      //返回WebSocket对象的连接状态
      if(this.ws.readyState === 1){
        this.ws.send(JSON.stringify(message));
        console.log('发送成功')
      }else{
        console.log(this.ws.readyState);
      }
    }else{
      alert('断开重连');
      setTimeout(()=>{
        this.ws.send(JSON.stringify(message));
      },1000);

    }


  }


}





