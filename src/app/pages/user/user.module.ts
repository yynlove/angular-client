import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { ShareModule } from 'src/app/core/share.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    ShareModule,  
    CommonModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
