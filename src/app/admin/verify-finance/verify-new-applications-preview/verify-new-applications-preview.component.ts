import { Component, OnInit } from '@angular/core';
import { UpdateApplication } from '../../../consumer/application/update-application/update-application.model';
import { ActivatedRoute, Params } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-verify-new-applications-preview',
  templateUrl: './verify-new-applications-preview.component.html',
  styleUrls: ['./verify-new-applications-preview.component.css']
})
export class VerifyNewApplicationsPreviewComponent implements OnInit {
  changeNameData;
  constructor(private route: ActivatedRoute, private localStorage: AsyncLocalStorage, private httpClient: HttpClient) { }
  index;
  applicationList;
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['id'];
        console.log(this.index);
      }
    );



    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        console.log(userLocal);
        this.httpClient.post('https://api-egn.nvixion.tech/employee/apps', userLocal.token, {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (response) => {
            console.log(response);
            this.changeNameData = response[this.index];
            console.log(this.changeNameData);
          }
        );
      }
    );

  }

  onApproveApplication(data) {
    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        console.log(userLocal);
        this.httpClient.post('https://api-egn.nvixion.tech/employee/verified', {applicationId: this.changeNameData.ApplicationID}, {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    );

  }

  onReject() {
    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        console.log(userLocal);
        this.httpClient.post('https://api-egn.nvixion.tech/employee/notverified', {applicationId: this.changeNameData.ApplicationID}, {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (response) => {
            console.log(response);
          }
        );
      }
    );
  }

}
