import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { User } from './data-typs/data';
import { API_CONFIG, ServicesModule } from './services.module';

@Injectable({
  providedIn: ServicesModule
})
export class UserService {

  constructor(private httpClient: HttpClient , @Inject(API_CONFIG) private url: string) { }


  getUsersInfo():Observable<User[]>{

    return this.httpClient.get(this.url+"users/listUsers").pipe(map(res =>res as User[]));
  }


}
