import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';
import { Hospital } from 'src/app/models/hospital.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {
  usuarios: Usuario;
  hospitales: Hospital;
  medicos: Medico;
  u = false;
  h = false;
  m = false;
  nada = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    const url = GLOBAL.url + 'busqueda/todo/' + termino;
    this.http.get(url).subscribe( (resp: any) => {
      if (resp.usuarios[0]) {
        this.usuarios = resp.usuarios;
        this.u = true;
      } else {
        this.u = false;
      }
      if (resp.hospitales[0]) {
        this.hospitales = resp.hospitales;
        this.h = true;
      } else {
        this.h = false;
      }
      if (resp.medicos[0]) {
        this.medicos = resp.medicos;
        this.m = true;
      } else {
        this.m = false;
      }
      if (resp.usuarios[0] || resp.hospitales[0] || resp.medicos[0]) {
        this.nada = false;
        return;
      }
      this.nada = true;
    });
  }
}
