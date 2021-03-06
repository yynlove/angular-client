import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from 'src/app/services/data-typs/data';
import { getUser, getUserState } from 'src/app/store/app-selector';
import { AppStoreModule } from 'src/app/store/app-store.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = true;

  user:User;

  constructor(
    private store$:Store<AppStoreModule>
  ) { }

  ngOnInit(): void {
    //获取最新值
    this.store$.pipe(select(getUserState),select(getUser)).subscribe(user => this.user = user);
  }



}
