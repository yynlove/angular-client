import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { MenusComponent } from './component/menus/menus.component';
import { RoleComponent } from './component/role/role.component';
import { UserComponent } from './component/user/user.component';
import { ShareModule } from 'src/app/core/share.module';
import { genderFormatPipe } from 'src/app/Pipes/gender-formet.pipe';
import { ChatRoomComponent } from './component/chat-room/chat-room.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
@NgModule({
  declarations: [WelcomeComponent,MenusComponent,RoleComponent,UserComponent,genderFormatPipe, ChatRoomComponent],
  imports: [
    CommonModule,
    ShareModule,
    ScrollingModule,
    
  ],
  exports:[
    WelcomeComponent,
    MenusComponent,
    RoleComponent,
    UserComponent,
    ChatRoomComponent,
  ]
})
export class SysModule { }
