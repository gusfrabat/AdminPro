import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {
  url: string;

  constructor() {
    this.url = GLOBAL.url;
  }

  // sirve para subir cualquier archivo
  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = () => {
        if (  xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response) );
          } else {
            console.log('error en la subida');
            reject( xhr.response );
          }
        }
      };
      const url = this.url + 'upload/' + tipo + '/' + id;
      console.log(url);
      xhr.open('PUT', url, true );
      xhr.send( formData );
    });
  }
}
