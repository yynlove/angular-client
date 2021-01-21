import { NgModule } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzMessageModule,
    NzDrawerModule,
    NzFormModule,
    NzRadioModule,
    NzTableModule,
    NzCheckboxModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzPopconfirmModule,
    NzButtonModule,
    NzMessageModule,
    NzDrawerModule,
    NzFormModule,
    NzRadioModule,
    NzTableModule,
    NzCheckboxModule,
    NzCardModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule
  ]
})
export class ShareModule { }
