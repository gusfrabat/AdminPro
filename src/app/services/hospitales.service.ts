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

  cargarHospitales() {
    const url = `${this.url}hospital`;
    return this.http.get(url);
  }

  obtenerHospital(id:	string) {
    const url = `${this.url}hospital/${id}`;
    return this.http.get(url);
  }

  crearHospital(nombre: string) {
    const url = `${this.url}hospital?token=${this.token}`;
    return this.http.post(url, nombre).pipe( map( (resp: any) => {
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
    this.http.get(url).pipe( map ( (resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital) {
    const nombre = hospital.nombre;
    const url = `${this.url}hospital/${hospital._id}?token=${this.token}`;
    this.http.put(url, hospital).pipe( map ( resp => {
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
