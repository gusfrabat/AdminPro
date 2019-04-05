import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { MedicoService } from 'src/app/services/medico.service';
import { Medico } from 'src/app/models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '');
  hospital: Hospital = new Hospital('');
  crear = true;

  constructor(
    private hospitalS: HospitalesService,
    private medicoS: MedicoService,
    private router: Router,
    private route: ActivatedRoute,
    private modalS: ModalUploadService
  ) {
    this.route.params.subscribe(params => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.cargarMedico(id);
        this.crear = false;
      }
    });
  }

  ngOnInit() {
    this.cargarTodosHospitales();
    this.modalS.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img;
    });
  }

  cargarTodosHospitales() {
    this.hospitalS.cargarTodosLosHospitales().subscribe( (resp: any) => this.hospitales = resp.data);
  }

  guardarMedico(f: NgForm) {
    if (f.invalid) {
      return;
    }
    if (this.medico._id) {
      this.medicoS.actualizarMedico(this.medico).subscribe();
      return;
    }
    this.medicoS.crearMedico(this.medico).subscribe( resp => {
      this.medico._id = resp._id;
      this.router.navigate(['medico', resp._id]);
    });
  }

  cambioHospital(id: string) {
    this.hospitalS.obtenerHospital(id).subscribe( (resp: any) => this.hospital = resp.hospital);
  }

  cargarMedico(id: string) {
    this.medicoS.buscarMedico(id).subscribe( medico => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }

  abrirModal(id: string) {
    this.modalS.mostrarModal('medicos', id);
  }
}
