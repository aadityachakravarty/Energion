import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from '../alerts/notification.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService,
    private notif: NotificationService
  ) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    return new Promise((resolve) => {
      if (localStorage.token) {
        this.auth.getInfo()
          .then((res: any) => {
            if (res.success) {
              this.router.navigate(['/admin']);
              resolve(false);
            }
            else {
              localStorage.clear();
              resolve(true);
            }
          })
          .catch((err) => {
            this.notif.fire('danger', err.message)
            resolve(true);
          });
      }
      else {
        resolve(true);
      }
    });
  }
}
