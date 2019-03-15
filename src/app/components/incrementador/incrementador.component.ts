import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtAncho') txtAncho: ElementRef;
  @Input() ancho = 50 ;
  @Input() leyenda = 'leyenda';
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange(event: number) {

    if (event > 100) {
      this.ancho = 100;
    } else if (event < 0 || event === null) {
      this.ancho = 0;
    } else {
      this.ancho = event;
    }
    this.txtAncho.nativeElement.value = this.ancho;
    this.cambioValor.emit(this.ancho);
  }

  cambiarValor(n: number) {
    if (this.ancho >= 0 && this.ancho < 100 && n >= 0) {
      this.ancho = this.ancho + 5 ;
      this.cambioValor.emit(this.ancho);
    } else if (n <= 0 && this.ancho > 0) {
      this.ancho = this.ancho - 5;
      this.cambioValor.emit(this.ancho);
    }
    this.txtAncho.nativeElement.focus()
  }

}
