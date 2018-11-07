import { Component, OnInit } from '@angular/core';
import { LoginService } from '../auth/login.service';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userType;
  loggedIn;
  constructor(private loginService: LoginService, private router: Router, private localStorage: AsyncLocalStorage,
              private httpClient: HttpClient) {}

  ngOnInit() {

    this.userType = 'consumer';
    this.loggedIn = false;
    this.loginService.userLoggedIn.subscribe(
      (isLog) => {
        this.loggedIn = isLog;
      }
    );
    this.loginService.userType.subscribe(
      (usetype) => {
        this.userType = usetype;
      }
    );
    this.localStorage.getItem('user').subscribe(
      (data) => {
        if (data) {
          console.log('checked');
          if (data.token) {
            this.loggedIn = true;
            this.userType = data.type;
            console.log(this.userType + "asdfaf");
            if(this.userType === 'admin') {
              this.router.navigate(['admin/verify-new-applications']);
            } else if (this.userType === 'consumer') {
              this.router.navigate(['consumer/home']);
            }
          }
        } else {
          this.loggedIn = false;
          this.userType = 'consumer';
        }
      }
    );
    console.log('logged in '+ this.loggedIn);
    this.loginService.userType.subscribe(
      () => {
        this.localStorage.getItem('user').subscribe(
          (usertypedata) => {
            this.userType = usertypedata.type;
            console.log(usertypedata.type);
          }
        );
      }
    );
  }

  onSignOut() {
    this.loggedIn = false;
    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        this.httpClient.get('https://api-egn.nvixion.tech/auth/logout', {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (logout) => {
            console.log(logout);
          }
        );
      }
    );

    this.localStorage.removeItem('user').subscribe(
      (localDestroy) => {
        console.log(localDestroy);
      }
    );

    console.log('is is loggd' + this.loggedIn);
    this.router.navigate(['/']);
  }
}
