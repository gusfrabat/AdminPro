import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  ancho1 = 10;
  ancho2 = 45;
  constructor() {
   }

  ngOnInit() {
  }

  // actualizar(event: number) {
  //   this.ancho1 = event ;
  // }

}
