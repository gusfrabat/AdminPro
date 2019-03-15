import { Component, OnInit } from '@angular/core';

declare function init_pluings(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pluings();
  }

}
