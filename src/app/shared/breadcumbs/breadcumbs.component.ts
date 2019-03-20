import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';


@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit {

  titulo: string;

  constructor(
    private router: Router,
    private tP: Title,
    private meta: Meta
    ) {
    this.nombreRuta().subscribe( data => {
      this.titulo = data.titulo;
      this.tP.setTitle('AdminPro | ' + this.titulo);
      const metaTag: MetaDefinition = {
        name: 'Descripción',
        content: this.titulo
      };
      this.meta.updateTag(metaTag);
    });
  }

  ngOnInit() {
  }

  nombreRuta() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((Response: ActivationEnd ) => Response.snapshot.data)
    );
  }

}
