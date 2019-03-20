import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  graficos: any = {
  grafico1: {
    labels: ['Mañana', 'Tarder', 'noche'],
    data:  [24, 30, 46],
    type: 'doughnut',
    leyenda: 'Horario'
    },
  grafico2: {
    labels: ['Hombres', 'Mujeres'],
    data:  [67, 33],
    type: 'doughnut',
    leyenda: 'Entrevistados'
    },
  grafico3: {
    labels: ['Si', 'No'],
    data:  [5, 95],
    type: 'doughnut',
    leyenda: '¿Ha llegado tarde?'
    },
  grafico4: {
    labels: ['Si', 'No'],
    data:  [85, 15],
    type: 'doughnut',
    leyenda: '¿Le importa que lo anoten?'
    },
  };

  constructor() {
   }

  ngOnInit() {
  }

}
