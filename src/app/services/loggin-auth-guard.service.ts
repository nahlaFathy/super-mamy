import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root'
})
export class LogginAuthGuardService implements CanActivate {

  constructor(
    private authService: LoginService,
        private router: Router
  ) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (this.authService.isLogged()) {
        this.router.navigate(['/'])
        return false;
    }
    return true;
}
}
