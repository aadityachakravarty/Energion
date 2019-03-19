import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
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
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    this.auth.getInfo((data) => {
      this.info = data;
    });
    
    if (this.info.admin) {
      return true;
    }
    else {
      this.router.navigate(['/consumer']);
      return false;
    }
  }
}
