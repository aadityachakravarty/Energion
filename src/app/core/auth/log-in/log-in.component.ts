import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../../token.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn: boolean;
  constructor(private loginService: LoginService, private router: Router, private localStorage: AsyncLocalStorage, private httpClient: HttpClient, private tokenService: TokenService) { }
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [ Validators.required]),
      'password': new FormControl(null, [ Validators.required])
    });

    this.localStorage.getItem('user').subscribe(
      (userlocal) => {
        if (userlocal) {
          this.isLoggedIn = true;
          this.loginService.userLoggedIn.next(true);
        } else {
          this.isLoggedIn = false;
        }
      }
    );
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.isLoggedIn = true;
    this.loginService.onLogin(this.loginForm.value).subscribe(
      response => {
        const responseData = JSON.parse(JSON.stringify(response));
        console.log(responseData);
        this.tokenService.token = responseData.token;
        if (true) {

          this.httpClient.get('https://api-egn.nvixion.tech/auth/status', {headers: new HttpHeaders({'x-access-token': responseData.token})}).subscribe(
            (authStatus) => {
              const safeAuthStatus = JSON.parse(JSON.stringify(authStatus));
              console.log(safeAuthStatus);
              this.loginService.userType.next('a');
              console.log(responseData.token);
              this.localStorage.setItem('user', {email: safeAuthStatus.data.email, token: responseData.token, type: safeAuthStatus.data.type, username: this.loginForm.get(['username']).value}).subscribe(
                (localData) => {
                  console.log(localData);
                });
            }
          );
          this.loginService.userLoggedIn.next(true);
          this.router.navigate(['consumer/home']);
        }
      },
      error => {
        console.log(error);
      },
    );



  }
}
