import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet, Colors} from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})

export class GraficoDonaComponent implements OnInit {
  leyenda: string;

  @Input() graficos: any;

   ChartLabels: Label[];
   ChartData: MultiDataSet;
   ChartType: ChartType;
   ChartColors: Colors[] = [
    {
      backgroundColor: ['#06d79c',
      '#ef5350', '#268fff']
    }
  ];

  constructor() {}

  ngOnInit() {
    this.crearGrafica();
  }

  crearGrafica() {
    this.ChartLabels = this.graficos.labels;
    this.ChartData = this.graficos.data;
    this.ChartType = this.graficos.type;
    this.leyenda = this.graficos.leyenda;
  }

}
