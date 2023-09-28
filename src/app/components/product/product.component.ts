import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  template: `Product <br>

  <router-outlet> </router-outlet>

  <br>
  <ul>
    <li *ngFor = "let photo of photos">
  
    <a [routerLink]="[photo.id]">{{photo.url}}</a>

 
`,
})
export class ProductComponent implements OnInit {

//constructor(private httpClient: HttpClient) {} 
constructor(private activatedRoute : ActivatedRoute) {
  
}
photos;

  ngOnInit(): void {

    this.activatedRoute.data.subscribe((data :any) => this.photos = data ["photos"]);
  }

}

