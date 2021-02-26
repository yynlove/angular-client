import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { Result, User } from './data-typs/data';
import { API_CONFIG, ServicesModule } from './services.module';
import queryString from 'query-string';

@Injectable({
  providedIn: ServicesModule
})
export class UserService {


  constructor(private httpClient: HttpClient , @Inject(API_CONFIG) private url: string) { }


  /**
   * 获取所有用户信息
   */
  getUsersInfo(pageIndex:number,pageSize:number):Observable<Result>{
 
    let params = new HttpParams().append('pageIndex',pageIndex.toString()).append('pageSize',pageSize.toString());
    return this.httpClient.get(this.url+'users/listUsers',{params}).pipe(map((res: Result)=>res));
  
  }

  /**
   * 编辑用户
   * @param data 
   */
  updateUser(data: User):Observable<Result> {
    let params = new HttpParams({fromString:queryString.stringify({data})});
    return this.httpClient.post(this.url+'users/udpateUser',{params}).pipe(map((res:Result) => res));
  }






}
