import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModelType, User } from '../../services/data-typs/data';
import { UserService } from '../../services/user.service';


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
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,) {
      iTokenService.refresh.subscribe(iTM=>{
        console.log("过期");
      })
    }

  ngOnInit(): void {
    
  }

  login(user:User): void {
    this.userService.login(user).subscribe(res =>{
      const token = res.headers.get('authorization');
      this.iTokenService.set({token});
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
