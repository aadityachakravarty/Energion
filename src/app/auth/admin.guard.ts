import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivateChild {

  info: any = {};

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(
    private router: Router,
    private auth: AuthService
  ) {

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.getInfo()
        .then((res: any) => {
          if (res.success && res.data.admin) {
            resolve(true);
          }
          else {
            this.router.navigate(['/consumer']);
            resolve(false);
          }
        })
        .catch(err => {
          this.router.navigate(['/consumer']);
          resolve(false);
        });
    });
  }
}
