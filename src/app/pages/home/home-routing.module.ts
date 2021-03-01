import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  { path: '',
    component: HomeComponent,
    children:[
    { path: 'welcome', loadChildren: () => import('../welcome/welcome.module').then(m => m.WelcomeModule) },
    { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule) },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
