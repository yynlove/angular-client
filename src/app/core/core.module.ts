import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { MenuFoldOutline,MenuUnfoldOutline,FormOutline,DashboardOutline} from '@ant-design/icons-angular/icons';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { ShareModule } from './share.module';
import { ServicesModule } from '../services/services.module';
import { PagesModule } from '../pages/pages.module';
import { DelonAuthModule, JWTInterceptor } from '@delon/auth';
import { PortalModule } from "../pages/portal/portal.module";
import { AppStoreModule } from '../store/app-store.module';

const icons = [MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline];

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
    ServicesModule,
    PagesModule,
    PortalModule,
    AppStoreModule,
    DelonAuthModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICONS, useValue: icons },
    { provide:HTTP_INTERCEPTORS,useClass:JWTInterceptor,multi:true}
  ],
})
export class CoreModule { }
