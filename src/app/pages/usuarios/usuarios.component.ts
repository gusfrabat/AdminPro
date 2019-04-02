import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde = 0;
  totalR = 0;
  cargando = true;

  constructor(
    private title: Title,
    private usuS: UsuarioService,
    private authS: AuthService,
    private modalUpload: ModalUploadService
    ) {
    this.title.setTitle('AdminPro | Mantenimiento usuario');
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.modalUpload.notificacion.subscribe(() => this.cargarUsuarios());
  }

  abrirModal(id: string) {
    this.modalUpload.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuS.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalR = resp.count;
      this.cargando = false;
      this.usuarios = resp.data;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalR) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;

    this.usuS.buscarUsuarios(termino).subscribe((resp: Usuario[]) => {
      this.cargando = false;
      this.usuarios = resp;
    });
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.authS.usuario._id) {
      Swal.fire({
        type: 'error',
        title: 'No se puede borrar el usuario',
        text: 'No se puede borrar a si mismo'
      });
      return;
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'deseas borrar el usuario ' + usuario.email,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si (eliminar)'
    }).then((result) => {
      if (result.value) {
        this.usuS.borrarUsuario(usuario._id).subscribe( () => {
          this.cargarUsuarios();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500
          });
          Toast.fire({
            type: 'success',
            title: 'El usuario fue eliminado'
          });
        });
      }
    });
  }

  guardarUsuRol(usuario: Usuario) {
    this.usuS.actualizarUsuario(usuario).subscribe(resp => console.log(resp));
  }

}
