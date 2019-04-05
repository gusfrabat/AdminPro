import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalR = 0;
  desde = 0;
  cargando = true;


  constructor(
    private medicoS: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.medicoS.cargarMedicos(this.desde).subscribe( (resp: any) => {
      this.totalR = resp.count;
      this.medicos = resp.data;
      this.cargando = false;
    });
  }
  buscarMedicos(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.cargando = true;

    this.medicoS.buscarMedicos(termino).subscribe((resp: Medico[]) => {
      this.cargando = false;
      this.medicos = resp;
    });
  }
  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'deseas borrar el medico ' + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si (eliminar)'
    }).then((result) => {
      if (result.value) {
        this.medicoS.borrarMedico(medico._id).subscribe( () => {
          this.cargarMedicos();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
          });
          Toast.fire({
            type: 'success',
            title: 'El medico fue eliminado'
          });
        });
      }
    });
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
    this.cargarMedicos();
  }

}
