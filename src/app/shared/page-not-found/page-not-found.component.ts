import { Component, OnInit } from '@angular/core';

declare function init_pluings(): any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pluings();
  }

}
