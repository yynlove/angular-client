import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { userReducer } from './app-reducer';


@NgModule({
  declarations: [],
  imports: [
    //注册userRefucer
    StoreModule.forRoot({user:userReducer}, {
      // 配置项
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true,
       strictStateSerializability: true,
       strictActionSerializability: true,
       strictActionWithinNgZone: true,
       strictActionTypeUniqueness: true,
     },
   }),
   StoreDevtoolsModule.instrument({
     // 记录20条
     maxAge: 20,
     // 生产模式下
     logOnly: environment.production
   })

  ]
})
export class AppStoreModule { }
