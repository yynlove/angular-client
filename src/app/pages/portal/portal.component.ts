import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MenuService } from 'src/app/services/menu.service';
import { SetUser } from 'src/app/store/app-action';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { ModelType, User } from '../../services/data-typs/data';
import { UserService } from '../../services/user.service';
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
    private store$: Store<AppStoreModule>,
    private cookieService:CookieService,
  ) {
      iTokenService.refresh.subscribe(iTM=>{
        console.log("过期");
      })
    }

  ngOnInit(): void {

  }

  login(user:User): void {
    this.userService.login(user).subscribe(res =>{
      //设置token
      const token = res.headers.get('authorization');
      this.iTokenService.set({token});
      this.cookieService.set('UID',res.body.toString());
      //状态管理设置user
      this.store$.dispatch(SetUser({user}));
      //跳转首页
      this.router.navigate(['/home/']);
    },(error)=>{
      this.nzMessageService.error('密码错误');
    })
  }


  modelChange(str :string){
    this.currentModalType = ModelType[str];
    console.log(this.currentModalType)
  }


}
