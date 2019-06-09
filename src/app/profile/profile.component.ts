import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Account } from '../model/type.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  user: Account;
  userForm: FormGroup;
  message: string;
  flag: boolean = false;

  constructor(private router: Router, private store: Store<Account>, private fb: FormBuilder, private accountService: AccountService) {
    this.store.select('userInfo').subscribe(u => this.user = u);
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      newPasswordRepeat: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
    });
  }

  onChangeUserInfo() {
    this.userForm.value.email = this.user.email;
    this.accountService.changeUserInfo(this.userForm.value)
      .then(res => {
        if (res.code === 1) {
          this.flag = true;
          this.userForm.get('name').setValue('');
          this.userForm.get('password').setValue('');
          this.userForm.get('newPassword').setValue('');
          this.userForm.get('newPasswordRepeat').setValue('');
          return this.message = 'Cập nhật thông tin thành công!';
        } else {
          return this.message = res.message;
        }
      })
      .catch(err => this.message = err.message);
  }

  closeURL() {
    return this.router.navigateByUrl('/');
  }
}
