import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authS: AuthService,
    ) {}

  canActivate(): boolean {
    if (this.authS.isLogged()) {
      return true;
    } else {
      this.authS.logout();
      return false;
    }
 }
}
