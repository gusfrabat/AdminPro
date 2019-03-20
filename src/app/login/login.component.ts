import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

declare function init_pluings(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private tP: Title
  ) {
    this.tP.setTitle('AdminPro | Login');
  }

  ngOnInit() {
    init_pluings();
  }

  ingresar() {
    console.log('ingresando ...');
    this.router.navigate(['/dashboard']);
  }

}
