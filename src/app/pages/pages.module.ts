import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { WelcomeModule } from './welcome/welcome.module';



@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    UserModule,
    WelcomeModule
  ],
  exports:[
    HomeModule,
    UserModule,
    WelcomeModule
  ]
})
export class PagesModule { }
