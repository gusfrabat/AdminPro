import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../models/hospital.model';
import { GLOBAL } from '../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HospitalesService {
  url: string;
  token: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = GLOBAL.url;
    this.token = localStorage.getItem('token');
  }

  cargarHospitales(desde: number) {
    const url = `${this.url}hospital/?desde=${desde}`;
    return this.http.get(url);
  }

  obtenerHospital(id:	string) {
    const url = `${this.url}hospital/${id}`;
    return this.http.get(url);
  }

  crearHospital(hosp: Hospital) {
    const url = `${this.url}hospital?token=${this.token}`;
    return this.http.post(url, hosp).pipe( map( (resp: any) => {
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
    const url = `${this.url}hospital/${id}?token=${this.token}`;
    return this.http.delete(url);
  }

  buscarHospitales(termino: string) {
    const url = `${this.url}busqueda/hospital/${termino}`;
    return this.http.get(url).pipe( map( (resp: any) => resp.hospitales));
  }


  actualizarHospital(hospital: Hospital) {
    const url = this.url + 'hospital/' + hospital._id + '?token=' + this.token;
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
