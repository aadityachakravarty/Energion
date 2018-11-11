import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../alerts/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private router: Router
  ) { }

  loginUser(data, next?) {
    this.http.post('/api/auth/login', data).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem('token', res.token);
          this.getProfile(() => {
            this.router.navigate(['/consumer']);
          });
        }
        else {
          this.notif.fire('warning', res.msg);
          if (next) {
            next();
          }
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
        if (next) {
          next();
        }
      }
    );
  }

  getProfile(next) {
    this.http.get('/api/auth/status', { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.setItem('profile', JSON.stringify(res.data));
          next();
        }
        else {
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    );
  }

  logout() {
    this.http.get('/api/auth/logout', { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          localStorage.clear();
          this.router.navigate(['/']);
        }
        else {
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    );
  }
}
