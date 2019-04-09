import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;

  constructor(
    public authS: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.authS.usuario;
    }

    buscar(termino: string) {
      this.router.navigate(['busqueda', termino]);
    }
}
