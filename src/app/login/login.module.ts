import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ShareModule } from '../core/share.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    ShareModule
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
