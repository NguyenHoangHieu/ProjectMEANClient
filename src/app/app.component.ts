import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Account, Loading, rootURL } from './model/type.model';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'ProductMEANProject';
  loading: boolean;

  constructor(private accountService: AccountService, private store: Store<Loading>, private router: Router) {
    //this.store.select('loading').subscribe(l => this.loading = l);
    this.accountService.check()
      .then((res: any) => {
        if (res.code === 1) {
          //console.log(res.data);
          console.log("===ham check======");
          console.log(res.data);
          console.log("===end======");
          this.store.dispatch({
            type: 'USER_LOGIN',
            user: res.data
          });
        }
      })
      .catch(err => {
        // if (this.router.url === '/signup') {
        //   return this.router.navigateByUrl('signup');
        // }
        return this.router.navigateByUrl('signin');
      });
  }



}
