import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent, HeaderComponent, HomeComponent, NotFoundComponent } from './layout/layout';
import { userReducer, loading } from './ngrx/reducers';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './service/account.service';
import {
  ProfileComponent,
  SigninComponent,
  MustBeGuestGuard,
  MustBeUserGuard,
  SignupGuard
} from './index';

const routes: Route[] = [
  { path: 'signin', component: SigninComponent, canActivate: [MustBeGuestGuard] },
  //{ path: 'signup', component: SignupComponent, canActivate: [SignupGuard]},
  { path: '', component: HomeComponent, canActivate: [MustBeUserGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [MustBeUserGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent, HeaderComponent, HomeComponent, NotFoundComponent,
    SigninComponent, ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      userInfo: userReducer,
      loading
    })
  ],
  providers: [AccountService, MustBeGuestGuard, MustBeUserGuard, SignupGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
