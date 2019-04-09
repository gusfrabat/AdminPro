import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaGuard implements CanActivate {

  constructor(
    private authS: AuthService
  ) {}

  canActivate(): Promise<boolean> | boolean {
    const token = this.authS.token;
    const playload = JSON.parse( atob( token.split('.')[1]));
    const expirado = this.expiro(playload.exp);
    if (expirado) {
      this.authS.logout();
      return false;
    }
    return this.renovar(playload.exp);

  }


  renovar(fechaExp: number): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const tokenExp = new Date(fechaExp * 1000);
      const ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 60 * 1000));

      if (tokenExp.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.authS.renovarToken().subscribe( () => {
          resolve(true);
        }, () => {
          reject(false);
          this.authS.logout();
        });
      }
    });
  }

  expiro(fechaExp: number) {
    const hora = new Date().getTime() / 1000;
    if (fechaExp < hora) {
      return true;
    } else {
      return false;
    }
  }
}
