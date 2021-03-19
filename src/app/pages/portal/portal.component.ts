import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SetUser } from 'src/app/store/app-action';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { ModelType, User } from '../../services/data-typs/data';
import { UserService } from '../../services/user.service';
import { Md5 } from "ts-md5/dist/md5";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  currentModalType = ModelType.Login;

  constructor(
    private userService:UserService,
    private router:Router,
    private nzMessageService:NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,
    private cookieService : CookieService,
    private store$: Store<AppStoreModule>,
  ) {
      
    }

  ngOnInit(): void {

  }

  login(user:User): void {
  
    let md5ste = Md5.hashStr(user.password).toString();
    user.password = md5ste;
    this.userService.login(user).subscribe(res =>{
      //设置token
      const token = res.headers.get('authorization');
      this.iTokenService.set({token:token});
      let bodyUser = res.body as User;
      if(this.cookieService.check('uid')){
        this.cookieService.delete('uid');
      }
      this.cookieService.set('uid',bodyUser.id.toString())
      //状态管理设置user
      this.store$.dispatch(SetUser({ user:bodyUser}));
      //跳转首页
      this.router.navigate(['/home/']);
    },(error)=>{
      this.nzMessageService.error('密码错误,获取失败');
    })
  }


  modelChange(str :string){
    this.currentModalType = ModelType[str];
    console.log(this.currentModalType)
  }


}
