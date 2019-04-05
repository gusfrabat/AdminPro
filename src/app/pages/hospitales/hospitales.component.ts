import { Component, OnInit } from '@angular/core';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  cargando = true;
  hospitales: Hospital;
  totalR = 0;
  desde = 0;

  constructor(
    private hospitalS: HospitalesService,
    private modalUpload: ModalUploadService,
  ) {}

  ngOnInit() {
    this.cargarHospitales();
    this.modalUpload.notificacion.subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalS.cargarHospitales(this.desde).subscribe( (resp: any) => {
      this.totalR = resp.count;
      this.cargando = false;
      this.hospitales = resp.data;
    });
  }

  abrirModal(id: string) {
    this.modalUpload.mostrarModal('hospitales', id);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    if (desde >= this.totalR) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  async sweetAlert() {
    const {value: hospital} = await Swal.fire({
      title: 'Crear hospital',
      text: 'Nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
      confirmButtonText: 'Crear'
    });
    if (hospital) {
       this.hospitalS.crearHospital(hospital).subscribe( () => this.cargarHospitales());
    }
  }

  actualizarHospital(hospital: Hospital) {
    this.hospitalS.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'deseas borrar el hospital ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si (eliminar)'
    }).then((result) => {
      if (result.value) {
        this.hospitalS.borrarHospital(hospital._id).subscribe( () => {
          this.cargarHospitales();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
          });
          Toast.fire({
            type: 'success',
            title: 'El hospital fue eliminado'
          });
        });
      }
    });
  }

  buscarHospitales(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this.hospitalS.buscarHospitales(termino).subscribe(resp => {
      this.cargando = false;
      this.hospitales = resp;
    });
  }
}
