import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Account } from '../model/type.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private store: Store<Account>
  ) {
    this.signInForm = this.fb.group({
      email: ['',
        [Validators.required, Validators.email]
      ],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  signIn() {
    const { email, password } = this.signInForm.value;
    this.accountService.login(email, password)
      .then(res => {
        if (res.code === 1) {
          this.store.dispatch({
            type: 'USER_LOGIN',
            user: {
              _id: res.data._id,
              name: res.data.name,
              email: res.data.email
            }
          });
          // save token
          this.router.navigateByUrl('/');
        } else {
          return this.errorMessage = res.message;
        }
      })
      .catch(err => this.errorMessage = err.message);
  }
}
