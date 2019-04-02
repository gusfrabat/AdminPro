import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SubirArchivoService } from 'src/app/services/settings/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imgTemp: any;
  imgSubida: File;

  constructor(
    private subirA: SubirArchivoService,
    private usuS: UsuarioService,
    private modalUpload: ModalUploadService
  ) {
   }

  ngOnInit() {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.imgSubida = null;
    this.modalUpload.ocultarModal();
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

    subirImg() {
      this.subirA.subirArchivo(this.imgSubida, this.modalUpload.tipo, this.modalUpload.id)
      .then( resp => {
        this.modalUpload.notificacion.emit(resp);
        this.cerrarModal();
      }).catch(err => {
        console.error(err);
      });
    }

}
