import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    let url = GLOBAL.url + 'img/';
    if (!img) {
      return url + 'usuarios/123';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    switch (tipo) {
      case 'usuarios':
      url += 'usuarios/' + img;
      break;
      case 'medicos':
      url += 'medicos/' + img;
      break;
      case 'hospitales':
      url += 'hospitales/' + img;
      break;
      default:
        console.log('la imagen no exites');
        url += 'usuarios/123';
    }
    return url;
  }

}
