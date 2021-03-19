import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import {  select, Store } from '@ngrx/store';
import { Menu, User } from 'src/app/services/data-typs/data';
import { AppStoreModule } from 'src/app/store/app-store.module';
import { CookieService } from "ngx-cookie-service";
import { MenuService } from 'src/app/services/menu.service';
import { SetUser } from 'src/app/store/app-action';
import { ActivatedRoute, ActivationEnd, Router } from '_@angular_router@11.2.4@@angular/router';
import { from } from 'rxjs';
import { filter, findIndex } from 'rxjs/internal/operators';
import { UserService } from 'src/app/services/user.service';
import { NzMessageService } from '_ng-zorro-antd@11.2.0@ng-zorro-antd/message';
import { DA_SERVICE_TOKEN, ITokenService } from '_@delon_auth@11.7.1@@delon/auth';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //是否缩略显示左侧
  isCollapsed = true;
  //用户信息
  user:User = null;
  //本用户授权的菜单
  menus:Menu[] =[];
  //tabset打开的菜单
  homeTabs:Menu[] = [];
  //激活的tabset索引
  tabSelectedIndex:number = -1;

	// 用于快速查找, 而不用每次都去 forEach(menus)
	menusMap: { [uid: string]: Menu } = {};


  constructor(
    private store$:Store<AppStoreModule>,
    private cookieService:CookieService,
    private menuService:MenuService,
    private router:Router,
    private userService:UserService,
    private activatedRoute: ActivatedRoute,
    private messageService:NzMessageService,
    @Inject(DA_SERVICE_TOKEN) private iTokenService: ITokenService,
  ) {

	  // 只订阅 ActivationEnd 事件
	  this.router.events.pipe(
      filter(e => e instanceof ActivationEnd))
	    .subscribe((e: ActivationEnd) => {
	      const snapshot = e.snapshot;
	      const isSkip = !(snapshot['_routerState'].url 
	      					&& snapshot.routeConfig.data 
	      					&& snapshot.routeConfig.data.useCache);
	      if (isSkip) return;
	
		  // 获取路由配置中自定义的唯一标记
		  // uid: Unique Identity
	      const title = snapshot.routeConfig.data.title;
        
        from(this.homeTabs)
        .pipe(findIndex((tab:Menu) => tab.title == title))
        .subscribe(index =>{
          if(index>=0){
            this.tabSelectedIndex = index;
          }else{
            this.openTab(this.menusMap[title]);
          }
        })
	
	    });
   }

  ngOnInit(): void {
    this.iTokenService['refresh'].subscribe(iTokenModel =>{
      console.log("token改变",iTokenModel);
    })

    //获取最新值
    let isExist = this.cookieService.check('uid');
    if(isExist){
      this.getUserMenus(this.cookieService.get('uid'));
    }
    
    //重回首页
    this.reHome();
  }

  getUserMenus(uid:string){
    this.menuService.getMenus(uid).subscribe(res =>{
      this.menus = res.menus;
      this.user = res.user;
      this.store$.dispatch(SetUser({user:res.user}));
      //封装map
      this.initMenusMap(this.menus);
    });
  }



  initMenusMap(ms: Array<Menu>) {
	  if (Array.isArray(ms)){
      from(ms).forEach(m =>{
        this.menusMap[m.title] = m;
        this.initMenusMap(m.children);
      });
    }
	}

  //重回首页
  reHome(){
    if(!(this.user) || this.homeTabs.length === 0){
      this.router.navigate(['/home']);
    }
  }


  //打开tab
  openTab(menu:Menu) {
	  if (!menu) return;
	
	  // 如果已经存在该tab页签, 直接将它选中
	  // 如果没有打开就添加该tab页签, 并将它选中
	  // pushUniqueA 为自定义方法, 后面有说明
	   from(this.homeTabs).pipe(findIndex(tab => tab.title === menu.title)).subscribe(index =>{
      if(index>=0){
        this.tabSelectedIndex = index;
      }else{
        this.homeTabs.push(menu);
        this.tabSelectedIndex = this.homeTabs.length -1;
      }
    })
	  
	  // 将当前页面标题切换为菜单名字
	  let tab = this.homeTabs[this.tabSelectedIndex];
	  // this.titleService.setTitle(tab.name);
	  // 激活这个tab对应的路由视图
	  this.activeRoute(tab);
	}


  // 关闭tab页签
	closeTab({ index }: { index: number }) {
	  // 删除tab
    this.homeTabs.splice(index, 1);
	  // 关闭激活的tab，把选中的tab 定位到激活的前一个
	  if (this.tabSelectedIndex === index && this.homeTabs.length) {
	    let nextIndex = this.tabSelectedIndex - 1;
	    this.tabSelectedIndex = nextIndex > 0 ? nextIndex : 0;
	    this.activeRoute(this.homeTabs[nextIndex]);
	  } else if (this.tabSelectedIndex > index) {
	    //关闭激活的tab的左侧tab , tab减一
	    this.tabSelectedIndex -= 1;
	  } else {
	    // 关闭后面的tab, 不作任何处理
	  }

    this.reHome();
	}
	
	// 切换tab选项卡，激活选项卡对应的路由
	tabSelect(tab) {
	  this.activeRoute(tab);
	}

  // 激活tab所关联的路由
	activeRoute(tab) {
	  this.router.navigateByUrl(`/home/${tab.link}`).finally();
	  //this.titleService.setTitle(this.tabs[this.selectedIndex].name);
	}


  logout(){
    this.userService.logout().subscribe(res =>{
      this.store$.dispatch(SetUser({user:null}));
      this.user = null;
      this.router.navigate(['/login/']);
    });
    
  }


















}
