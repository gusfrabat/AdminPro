import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authS: AuthService,
    ) {}

  canActivate(): boolean {
    if (this.authS.usuario.role === 'ADMIN_ROL') {
      return true;
    } else {
      console.error('NO tiene permisos');
      this.authS.logout();
      return false;
    }
 }
}

