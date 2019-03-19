import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../alerts/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  details: any = {
    admin: false,
    logged: false
  }

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private router: Router
  ) { }

  loginUser(data, next?) {
    this.http.post('/api/auth/login', data).subscribe(
      (res: any) => {
        if (res.success) {
          this.details.logged = true;
          localStorage.setItem('token', res.token);
          this.getProfile();
          this.getInfo((data) => {
            if (data.admin) {
              this.details.admin = true;
              this.router.navigate(['/admin']);
            }
            else {
              this.router.navigate(['/consumer']);
            }
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

  getProfile() {
    this.http.get('/api/auth/status', { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          let data = res.data;
          delete data.admin;
          delete data.lineman;
          localStorage.setItem('profile', JSON.stringify(data));
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

  getInfo(next) {
    this.http.get('/api/auth/status', { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          next(res.data);
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
          this.details.details = {};
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
