import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { GLOBAL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url: string;
  usuario: Usuario;
  token: string;
  menu: any = [];

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
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = this.url + 'login/google';
    return this.http.post(url, {token}).pipe(map((resp: any) => {
      this.guardarStorage(resp.token, resp.data, resp.menu);
      return true;
    }));
   }

   renovarToken() {
    const url = this.url + 'login/renuevatoken?token=' + this.token;
    return this.http.get(url).pipe( map((resp: any) => {
      this.token = resp.token;
      localStorage.setItem('token', this.token);
      console.warn('token renovado');
      return true;
    }),
    catchError( err => {
      this.logout();
      return throwError(err);
    })
    );
   }

  login( usuario: Usuario, recordar = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = this.url + 'login';
    return this.http.post(url, usuario).pipe(map((resp: any) => {
      this.guardarStorage(resp.token, resp.data, resp.menu);
      return resp;
    }),
    catchError(err => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'error',
        title: 'Error en el login',
        text: err.error.mensaje
      });

      return throwError(err);
    })
    );
  }

  guardarStorage(token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  }
}
