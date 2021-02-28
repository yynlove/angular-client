import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShareModule } from 'src/app/core/share.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ShareModule,
    HomeRoutingModule
  ],
  exports:[
    HomeComponent
  ]
})
export class HomeModule { }
