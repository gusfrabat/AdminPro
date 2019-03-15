import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {
  leyenda: string;

  @Input() graficos: any;

  public ChartLabels: Label[];
  public ChartData: MultiDataSet;
  public ChartType: ChartType;

  constructor() {}

  ngOnInit() {
    this.ChartLabels = this.graficos.labels;
    this.ChartData = this.graficos.data;
    this.ChartType = this.graficos.type;
    this.leyenda = this.graficos.leyenda;
  }

}
