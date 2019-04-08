import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imgTemp: any;
  imgSubida: File;

  constructor(
    private usuarioS: UsuarioService,
    private authS: AuthService,
  ) {
    this.usuario = this.authS.usuario;
   }
  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.nombres = usuario.nombres;
    this.usuario.apellidos = usuario.apellidos;
    this.usuario.email = usuario.email;
    this.usuarioS.actualizarUsuario(this.usuario).subscribe();
  }


  seleccionImg( archivo: File ) {
    if (!archivo) {
      this.imgSubida = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imgSubida = null;
      Swal.fire({
        type: 'error',
        title: 'Sólo imágenes',
        text: 'EL archivo seleccionado no es una imagen'
      });
      return;
    }
    this.imgSubida = archivo;
    const reader = new FileReader();
    const urlImgTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imgTemp = reader.result;
    }



  cambiarImg() {
    this.usuarioS.cambiarImg(this.imgSubida, this.usuario._id);
  }

}
