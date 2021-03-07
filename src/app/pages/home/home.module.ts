import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/app/core/share.module';
import { HomeRoutingModule } from './home-routing.module';
import { CommonModule } from '_@angular_common@11.2.4@@angular/common';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    ShareModule,
    HomeRoutingModule,
    CommonModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
