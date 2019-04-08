import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../models/usuario.model';
import { NgZone } from '@angular/core';

declare function init_pluings(): any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame = false;
  email: string;
  auth2: any;

  constructor(
    private router: Router,
    private tP: Title,
    private authS: AuthService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    init_pluings();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email) {
      this.recuerdame = true;
    }
    this.tP.setTitle('AdminPro | Login');
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '519103439220-4r7ggohg3q3t4p5i5te83ntiihuecda9.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }

  attachSignIn(elemen) {
    this.auth2.attachClickHandler( elemen, {}, (googleUser) => {
      const token = googleUser.getAuthResponse().id_token;
      // const profile = googleUser.getBasicProfile();
      this.zone.run( () => {
        this.authS.loginGoogle(token).subscribe( ok => this.router.navigate(['/dashboard']));
      });
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }
    const usuario = new Usuario(null, null, forma.value.email, forma.value.password);
    this.authS.login(usuario, forma.value.recuerdame).subscribe( resp => {
      this.router.navigate(['/dashboard']);
    });
    forma.reset('');
  }

}
