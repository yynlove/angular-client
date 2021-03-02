import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';
import { Result, User } from './data-typs/data';
import { API_CONFIG, ServicesModule } from './services.module';


@Injectable({
  providedIn: ServicesModule
})
export class UserService {



  constructor(
    private httpClient: HttpClient,
    @Inject(API_CONFIG) private url: string) {
    
    }


  /**
   * 获取所有用户信息
   */
  getUsersInfo(pageIndex:number,pageSize:number,account,userName,age):Observable<Result>{

    let params = new HttpParams()
    .append('pageIndex',pageIndex.toString())
    .append('pageSize',pageSize.toString())
    .append('account',account)
    .append('userName',userName)
    .append('age',age.toString());
    return this.httpClient.get(this.url+'users/listUsers',{params}).pipe(map((res: Result)=>res));

  }

  /**
   * 编辑用户
   * @param data
   */
  updateUser(data: User):Observable<Result> {
    return this.httpClient.put(this.url+'users/updateUser',data).pipe(map((res:Result) => res ));
  }


  /**
   * 校验用户登录名是否重复
   */
  checkAccount(value: string): Observable<number> {
    const params = new HttpParams().append('account',value);
    return this.httpClient.get(this.url +'users/checkAccount',{params}).pipe(map((res:number) => res));
  }


  /**
   * 新增用户
   */
  insertOne(user: User):Observable<number> {
   return this.httpClient.post(this.url+'users/insertOne',user).pipe(map((res:number) => res));
  }

  /**
   * 删除一个用户
   * @param id
   */
  deleteUserById(id: number):Observable<number> {
    const params = new HttpParams().append('id',id.toString());
    return this.httpClient.delete(this.url+'users/deleteUserById',{params}).pipe(map((res:number)=>res));
  }


  /**
   * 登录
   * @param error
   */
  login(user:User):Observable<User>{
    return this.httpClient.post(this.url+'users/login',user).pipe(catchError(this.handleError),map((res:Result) => {
      return res.data;
    } ));
  }



  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 客户端也可能出现问题，例如网络错误会让请求无法成功完成，或者 RxJS 操作符也会抛出异常。这些错误会产生 JavaScript 的 ErrorEvent 对象
      console.error('An error occurred:', error.error.message);
    } else {
      // 服务器端可能会拒绝该请求，并返回状态码为 404 或 500 的 HTTP 响应。这些是错误响应。
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }




}
