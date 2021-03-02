import { NgModule } from '@angular/core';
import { HomeModule } from './home/home.module';
import { PortalModule } from './portal/portal.module';
import { UserModule } from './user/user.module';
import { WelcomeModule } from './welcome/welcome.module';



@NgModule({
  declarations: [],
  imports: [
    HomeModule,
    UserModule,
    WelcomeModule,
    PortalModule
  ],
  exports:[
    HomeModule,
    UserModule,
    WelcomeModule,
    PortalModule
  ]
})
export class PagesModule { }
