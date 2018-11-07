import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-verify-completed-applications-preview',
  templateUrl: './verify-completed-applications-preview.component.html',
  styleUrls: ['./verify-completed-applications-preview.component.css']
})
export class VerifyCompletedApplicationsPreviewComponent implements OnInit {
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

}
