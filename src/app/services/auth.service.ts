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

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.url = GLOBAL.url;
   }

  isLogged() {
    if (localStorage.getItem('token')) {
      return ( localStorage.getItem('token').length > 5 ) ? true : false;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return false;
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
