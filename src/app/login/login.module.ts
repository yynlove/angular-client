import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { NgzerroModule } from '../ngzerro/ngzerro.module';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    NgzerroModule,
  ],
  exports:[LoginComponent]
})
export class LoginModule { }
