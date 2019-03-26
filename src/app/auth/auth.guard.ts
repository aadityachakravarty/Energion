import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.getInfo()
        .then((res: any) => {
          if (res.success) {
            resolve(true);
          }
          else {
            this.router.navigate(['/auth/login']);
            resolve(false);
          }
        })
        .catch(err => {
          this.router.navigate(['/auth/login']);
          resolve(false);
        });
    });
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.getInfo()
        .then((res: any) => {
          if (res.success) {
            resolve(true);
          }
          else {
            this.router.navigate(['/auth/login']);
            resolve(false);
          }
        })
        .catch(err => {
          this.router.navigate(['/auth/login']);
          resolve(false);
        });
    });
  }
}
