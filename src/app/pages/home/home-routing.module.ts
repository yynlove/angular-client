import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JWTGuard } from "@delon/auth";
import { MenusComponent } from "../sys/component/menus/menus.component";
import { RoleComponent } from "../sys/component/role/role.component";
import { UserComponent } from "../sys/component/user/user.component";
import { WelcomeComponent } from "../sys/component/welcome/welcome.component";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    canActivate: [JWTGuard],
    children:[
      { path: 'welcome', component:WelcomeComponent,data:{tilte:'欢迎',useCache:true}},
      { path: 'user',component:UserComponent,data:{tilte:'用户管理',useCache:true} },
      { path: 'role',component:RoleComponent,data:{tilte:'角色管理',useCache:true} },
      { path: 'menus', component:MenusComponent,data:{tilte:'菜单管理',useCache:true}},
  ]},
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
