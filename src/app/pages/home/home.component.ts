import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Menu, User } from 'src/app/services/data-typs/data';
import { getUser, getUserState } from 'src/app/store/app-selector';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { CookieService } from "ngx-cookie-service";
import { MenuService } from 'src/app/services/menu.service';
import { SetUser } from 'src/app/store/app-action';
import { Router } from '_@angular_router@11.2.4@@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = true;

  user:User = null;
  menus:Menu[] =[];
  constructor(
    private store$:Store<AppStoreModule>,
    private cookieService:CookieService,
    private menuService:MenuService,
    private router:Router,
  ) {

     //获取最新值
     const isExist = this.cookieService.check('UID');
     console.log(isExist)

       if(isExist){
         const uid = this.cookieService.get('UID');
         console.log(uid);
         this.menuService.getMenus(uid).subscribe(res =>{
           console.log('res',res);
           this.menus = res.menus;
           this.user = res.user;
           this.cookieService.set('UID',res.user.id.toString());
           this.store$.dispatch(SetUser({user:res.user}));

         });
       }else{
         this.router.navigate(['/login']);
       }


   }

  ngOnInit(): void {

  }



}
