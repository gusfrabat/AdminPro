import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private tP: Title) {
    this.tP.setTitle('AdminPro ! Login');
   }

  ngOnInit() {
  }

}
