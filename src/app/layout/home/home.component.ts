import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  profileURL(){
    return this.router.navigateByUrl('profile');
  }

  categoryURL(){
    return this.router.navigateByUrl('category');
  }

  productURL(){
    return this.router.navigateByUrl('product');
  }
}
