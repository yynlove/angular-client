import { NgModule } from '@angular/core';
import { PortalComponent } from './portal.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ShareModule } from 'src/app/core/share.module';
import { PortalRoutingModule } from './portal-routing.module';



@NgModule({
  declarations: [PortalComponent, LoginComponent, RegisterComponent],
  imports: [
    PortalRoutingModule,
    ShareModule
  ],
  exports:[
    PortalComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class PortalModule { }
