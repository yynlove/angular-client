import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login',loadChildren: () => import('./pages/portal/portal.module').then(m => m.PortalModule),data:{title:'登录',useCache:false}},
  { path: 'home',loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),data:{title:'主页',useCache:false}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
