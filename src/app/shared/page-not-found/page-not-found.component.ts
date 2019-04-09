import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

declare function init_pluings(): any;

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  year: number;

  constructor(
    public authS: AuthService
  ) {
    this.year = new Date().getFullYear();
  }

  ngOnInit() {
    init_pluings();
  }

}
