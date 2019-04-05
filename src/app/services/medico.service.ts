import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../config/config';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  url: string;

  constructor(
    private http: HttpClient,
    private authS: AuthService,
  ) {
    this.url = GLOBAL.url;
   }

  cargarMedicos(desde: number) {
    const url = this.url + 'medico/?desde=' + desde;
    return this.http.get(url);
  }

  buscarMedico(id: string) {
    const url = `${this.url}medico/${id}`;
    return this.http.get(url).pipe( map( (resp: any) => resp.medico));
  }

  buscarMedicos(termino: string) {
    const url = `${this.url}busqueda/usuario/${termino}`;
    return this.http.get(url).pipe( map( (resp: any) => resp.medicos));
   }

   borrarMedico(id: string) {
     const url = `${this.url}medico/${id}?token=${this.authS.token}`;
     return this.http.delete(url);
   }

   crearMedico(medico: Medico) {
     const url = this.url + 'medico?token=' + this.authS.token;
     return this.http.post(url, medico).pipe( map( (resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Medico creado ' + ' ' + resp.data.nombre
      });
      return resp.data;
     }));
   }

   actualizarMedico(medico: Medico) {
    const url = this.url + 'medico/' + medico._id + '?token=' + this.authS.token;
    return this.http.put(url, medico).pipe(map((resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Medico Actualizado'
      });
      return true;
    }));
  }
}
