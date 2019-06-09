import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Store } from '@ngrx/store';
import { Account } from '../../model/type.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  user: Account;

  constructor(private accountService : AccountService, private store: Store<Account>) { 
    this.store.select('userInfo').subscribe(u => this.user = u);
  }

  ngOnInit() {
  }

  logOut(){
    this.accountService.logout();
  }

}
