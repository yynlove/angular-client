import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../services/data-typs/data';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;



  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(user:User): void {
    this.userService.login(user).subscribe(res =>{
      console.log(res);
      this.router.navigate(['/home']);
    })
  }
}
