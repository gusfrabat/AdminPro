import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalR = 0;
  cargando = false;

  constructor(
    private title: Title,
    private usuS: UsuarioService
    ) {
    this.title.setTitle('AdminPro | Mantenimiento usuario');
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuS.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalR = resp.count;
      this.usuarios = resp.data;
    });
  }

}
