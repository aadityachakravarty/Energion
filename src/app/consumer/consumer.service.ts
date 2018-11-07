import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class ConsumerService {
  newApplicationFormData = new Subject();

  myApplications; //stores the data for you applications

  localData;//local data of logged in user

  setApplication = new Subject(); // it will echo all the applications

  constructor(private httpClient: HttpClient, private localStorage: AsyncLocalStorage) {}

  onMyApplication() {
    this.localStorage.getItem('user').subscribe(
      (data) => {
        if (data.token) {
          console.log('TokenAuth');
          console.log(data.email);
          this.localData = data;
          console.log(this.localData);
        }
      }
    );
    return this.httpClient.post('https://api-egn.nvixion.tech/connection/mycon', this.localData.email, {headers: new HttpHeaders({'x-access-token': this.localData.token })}).map(
      (response) => {
        const clearResponse = JSON.parse(JSON.stringify(response));
        console.log(clearResponse);
        this.myApplications = clearResponse;
        console.log(this.myApplications);
        return clearResponse;
      }
    );
  }

  onNewApplication(newApplicationData) {
    return this.httpClient.post('https://api-egn.nvixion.tech/connection/new', newApplicationData, {headers: new HttpHeaders({'x-access-token': this.localData.token})});
  }


}
