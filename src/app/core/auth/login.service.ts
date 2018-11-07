import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class LoginService {

  userLoggedIn = new Subject();
  userType = new Subject();
  localData;

  constructor(private httpClient: HttpClient, private localStorage: AsyncLocalStorage) { }

  onGet() {
    this.httpClient.get('https://api.nvixion.tech/').subscribe(
      (data) => {
        console.log(data);
      }
    );
  }

  onLogin(loginData) {
    return this.httpClient.post('https://api-egn.nvixion.tech/auth/login', loginData);
  }

  onLogOut() {
    this.localStorage.getItem('user').subscribe(
      (tokenData) => {
        this.localData = tokenData.token;
        this.localStorage.clear().subscribe(() => {});
      }
    );
    return this.httpClient.get('https://api-egn.nvixion.tech/auth/logout', { headers: new HttpHeaders({'x-access-token': this.localData})});
  }

  onSignUp(signUpData) {
    return this.httpClient.post('https://api-egn.nvixion.tech/auth/register', signUpData);
  }


}
