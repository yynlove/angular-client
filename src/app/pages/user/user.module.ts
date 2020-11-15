import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    NzTableModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzMessageModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
