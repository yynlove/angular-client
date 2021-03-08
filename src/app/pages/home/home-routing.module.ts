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
      { path: 'welcome', component:WelcomeComponent },
      { path: 'user',component:UserComponent },
      { path: 'role',component:RoleComponent },
      { path: 'menus', component:MenusComponent},
  ]},
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
