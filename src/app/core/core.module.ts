import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MenuFoldOutline,MenuUnfoldOutline,FormOutline,DashboardOutline} from '@ant-design/icons-angular/icons';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { ShareModule } from './share.module';
import { ServicesModule } from '../services/services.module';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports:[
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HammerModule,
    ShareModule,
    ServicesModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons }
  ],
})
export class CoreModule { }
