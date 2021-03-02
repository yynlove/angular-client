import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService, JWTTokenModel } from '@delon/auth';
import { NzMessageService } from 'ng-zorro-antd/message';
import { User } from '../../services/data-typs/data';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  loginForm : FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router,
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,
    private nzMessageService:NzMessageService) {

    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(user:User): void {
    this.userService.login(user).subscribe(res =>{
      this.iTokenService.set({token: res.token});
      this.router.navigate(['/home/']);
    },(error)=>{
      this.nzMessageService.error('密码错误');
    })
  }

}
