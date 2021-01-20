import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CommonModule } from '@angular/common';
import { NgzerroModule } from 'src/app/ngzerro/ngzerro.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    NgzerroModule,
    CommonModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
