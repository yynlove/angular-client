import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Menu, User } from './data-typs/data';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule
})
export class MenuService {

  constructor(
    private httpClient: HttpClient,
    @Inject(API_CONFIG) private url: string,
  ) { }

  /**
   * 获取菜单
   */
  getMenus(userId:string):Observable<{user:User,menus:Menu[]}>{
    const params = new HttpParams().append('uid',userId);
    return this.httpClient.get(this.url+'menu/getUserMenus',{params}).pipe(map((res:{user:User,menus:Menu[]})=>res));
  }

}
