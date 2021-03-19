import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling'

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {


  @ViewChild('scrollComponent')
  _scrollViewport: CdkVirtualScrollViewport;

  data:any[];

  constructor() { }

  ngOnInit(): void {

    this.data = [
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
      {title:"ni ",name:"",touxiang:'a'},
    ]
    console.log(this._scrollViewport)

    this._scrollViewport.scrollToIndex(5);
  }

 

}
