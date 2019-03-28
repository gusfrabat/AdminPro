import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

// tslint:disable-next-line: deprecation
  constructor( @Inject(DOCUMENT) private documento) {
    this.cargarAjustes();
  }

    guadarAjustes() {
      localStorage.setItem('ajustes', JSON.stringify(this.ajustes));

    }

    cargarAjustes() {
      if (localStorage.getItem('ajustes')) {
        this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
        this.aplicarTema(this.ajustes.tema);
      } else {
        this.aplicarTema(this.ajustes.tema);
      }
    }

    aplicarTema(tema: string) {
      const url = `assets/css/colors/${tema}.css`;
      this.documento.getElementById('tema').setAttribute('href', url);

      this.ajustes.tema = tema;
      this.ajustes.temaUrl = url;

      this.guadarAjustes();
    }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
