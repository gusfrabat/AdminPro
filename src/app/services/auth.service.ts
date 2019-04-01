import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { GLOBAL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.url = GLOBAL.url;
  }

  isLogged() {
    this.loadUser();
    return ( this.token.length > 5 ) ? true : false;
  }

  loadUser() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = this.url + 'login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.guardarStorage(resp.token, resp.data);
      return true;
    }));
   }

  login( usuario: Usuario, recordar = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = this.url + 'login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarStorage(resp.token, resp.data);
      return true;
    }));
  }

  guardarStorage(token: string, usuario: Usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
}
