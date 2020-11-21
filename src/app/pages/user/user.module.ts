import { NgModule } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    NzTableModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzMessageModule,
    NzDrawerModule,
    NzFormModule,
    NzRadioModule
  ],
  exports: [UserComponent]
})
export class UserModule { }
