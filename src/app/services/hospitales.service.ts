import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../models/hospital.model';
import { GLOBAL } from '../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  url: string;

  constructor(
    private http: HttpClient,
    private authS: AuthService
  ) {
    this.url = GLOBAL.url;
  }

  cargarHospitales(desde: number) {
    const url = `${this.url}hospital/?desde=${desde}`;
    return this.http.get(url);
  }

  obtenerHospital(id:	string) {
    const url = `${this.url}hospital/${id}`;
    return this.http.get(url);
  }

  crearHospital(nombre: string) {
    const url = `${this.url}hospital?token=${this.authS.token}`;
    return this.http.post(url, {nombre}).pipe( map( (resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Hospital creado ' + ' ' + resp.data.nombre
      });
      return resp.data;
    }));
  }

  borrarHospital(id: string) {
    const url = `${this.url}hospital/${id}?token=${this.authS.token}`;
    return this.http.delete(url);
  }

  buscarHospitales(termino: string) {
    const url = `${this.url}busqueda/hospital/${termino}`;
    return this.http.get(url).pipe( map( (resp: any) => resp.hospitales));
  }


  actualizarHospital(hospital: Hospital) {
    const url = this.url + 'hospital/' + hospital._id + '?token=' + this.authS.token;
    return this.http.put(url, hospital).pipe(map((resp: any) => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3500
      });
      Toast.fire({
        type: 'success',
        title: 'Hospital Actualizado'
      });
      return true;
    }));
  }
 }
