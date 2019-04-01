import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';
import { SubirArchivoService } from './settings/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string;
  token: string;
  usuario: Usuario;

  constructor(
    private http: HttpClient,
    private authS: AuthService,
    private subirS: SubirArchivoService
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
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

  actualizarUsuario(usuario: Usuario) {
    const url = this.url + 'usuario/' + usuario._id + '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map((resp: any) => {
      this.authS.guardarStorage(this.token, resp.usuario);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Usuario Actualizado'
      });
      return true;
    }));
  }

  cambiarImg(archivo: File, id: string) {
    this.subirS.subirArchivo(archivo, 'usuarios', id)
    .then( (resp: any) => {
      this.usuario = this.authS.usuario;
      this.usuario.img = resp.usuario.img;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Imagen del usuario actualizada'
      });
      this.authS.guardarStorage(this.token, this.usuario);
    }).catch( err => {
    });
  }
}

