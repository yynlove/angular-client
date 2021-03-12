import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SimpleReuseStrategy } from './util/SimpleReuseStrategy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule
  ],
  bootstrap: [AppComponent],
  providers:[
     // 注册路由重用服务提供商
     {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},
  ]
})
export class AppModule { }
