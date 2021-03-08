import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { MenusComponent } from './component/menus/menus.component';
import { RoleComponent } from './component/role/role.component';
import { UserComponent } from './component/user/user.component';
import { ShareModule } from 'src/app/core/share.module';
import { genderFormatPipe } from 'src/app/Pipes/gender-formet.pipe';

@NgModule({
  declarations: [WelcomeComponent,MenusComponent,RoleComponent,UserComponent,genderFormatPipe],
  imports: [
    CommonModule,
    ShareModule,
  
  ],
  exports:[
    WelcomeComponent,
    MenusComponent,
    RoleComponent,
    UserComponent
  ]
})
export class SysModule { }
