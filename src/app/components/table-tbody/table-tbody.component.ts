import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-tbody',
  templateUrl: './table-tbody.component.html',
  styleUrls: ['./table-tbody.component.css']
})
export class TableTbodyComponent implements OnInit {

  @Input() datos: any;
  @Input() tipo: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(
  ) {
  }

  irPagina(dato: any) {
    if (this.tipo === 'Médicos') {
      this.router.navigate(['medico', dato._id]);
      return;
    }
    const tipo = this.tipo.toLowerCase();
    this.router.navigate([tipo]);
  }

}
