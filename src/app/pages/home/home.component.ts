import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {  Store } from '@ngrx/store';
import { Menu, User } from 'src/app/services/data-typs/data';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { CookieService } from "ngx-cookie-service";
import { MenuService } from 'src/app/services/menu.service';
import { SetUser } from 'src/app/store/app-action';
import { NavigationEnd, Router } from '_@angular_router@11.2.4@@angular/router';
import { from } from 'rxjs';
import { filter, findIndex } from 'rxjs/internal/operators';
import { renderFlagCheckIfStmt } from '_@angular_compiler@11.2.4@@angular/compiler/src/render3/view/template';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnChanges {

  isCollapsed = true;

  user:User = null;
  menus:Menu[] =[];

  homeTabs:Menu[] = [];


  tabSelectedIndex:number = -1;

  constructor(
    private store$:Store<AppStoreModule>,
    private cookieService:CookieService,
    private menuService:MenuService,
    private router:Router,
  ) {


   }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(!changes['tabSelectedIndex'].firstChange){
      console.log('11111');
    }



  }

  ngOnInit(): void {
    //获取最新值
    const isExist = this.cookieService.check('UID');
    
    if(isExist){
      const uid = this.cookieService.get('UID');
    
      this.menuService.getMenus(uid).subscribe(res =>{
    
        this.menus = res.menus;
        this.user = res.user;
        this.cookieService.set('UID',res.user.id.toString());
        this.store$.dispatch(SetUser({user:res.user}));
        //this.cdr.markForCheck();
      });
    }else{
      this.router.navigate(['/login']);
    }

    this.reHome();
  }

  closeTab({ index }: { index: number }): void {
    this.homeTabs.splice(index, 1);
    this.reHome();
  }

  reHome(){
    if(this.homeTabs.length ===0){
      this.router.navigate(['/home']);
    }
  }


  openTab(menu:Menu){
    from(this.homeTabs).pipe(findIndex((tab)=> tab.link === menu.link)).subscribe(index =>{
      if(index<0){
        this.homeTabs.push(menu);
        this.router.navigateByUrl(`/home/${this.homeTabs[this.homeTabs.length-1].link}`);
      }
    });
    
  }


  changeType(index?:number){
  
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(res =>{
      this.tabSelectedIndex = index; 
      console.log(res);
    })
    
    
  }


  select(menu:Menu,index:number){
    console.log('选中',menu.title);
    console.log('选中',this.tabSelectedIndex);
    
    this.tabSelectedIndex = index + 1;
  }

  gaibianIndex(index:number){
    console.log("改变了：",index);
    
  }



}
