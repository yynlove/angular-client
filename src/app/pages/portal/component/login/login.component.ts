import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModelType, User } from 'src/app/services/data-typs/data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  @Output() onLogin =new EventEmitter<any>();

  @Output() onModelTypeChange = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    ) { }



  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login_account: [null, [Validators.required]],
      login_password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    const user= {
      account:this.loginForm.controls.login_account.value,
      password:this.loginForm.controls.login_password.value,
      remember:this.loginForm.controls.remember.value
    }
    this.onLogin.emit(user);
  }

  typeChange(){
    this.onModelTypeChange.emit(ModelType.Register);
  }

}
