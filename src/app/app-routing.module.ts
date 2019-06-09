import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { HomeComponent } from './layout/layout';

// import {
//   ProfileComponent,
//   SigninComponent
// } from './index';

const routes: Routes = []

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'signin', component: SigninComponent},
//   { path: 'profile', component: ProfileComponent},
  
//   //{ path: 'post', component: PostComponent,  canActivate: [MustBeUserGuard] },
//   { path: '**', component: HomeComponent}
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
