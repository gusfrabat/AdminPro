import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  crearUsusario(usuario: Usuario) {
    const url = this.url + 'usuario';
    return this.http.post(url, usuario).pipe( map( (resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Usuario creado ' + ' ' + usuario.email
      });
      return resp.usuario;
    }));
  }
}
