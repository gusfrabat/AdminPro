import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authS: AuthService,
    private router: Router
    ) {}

  canActivate(): boolean {
    if (this.authS.isLogged()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
 }
}
