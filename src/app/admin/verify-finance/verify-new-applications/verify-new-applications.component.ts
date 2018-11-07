import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-new-applications',
  templateUrl: './verify-new-applications.component.html',
  styleUrls: ['./verify-new-applications.component.css']
})
export class VerifyNewApplicationsComponent implements OnInit {
  applicationList;
  constructor(private httpClient: HttpClient, private localStorage: AsyncLocalStorage, private router: Router) { }

  ngOnInit() {
    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        console.log(userLocal);
        this.httpClient.post('https://api-egn.nvixion.tech/employee/apps', userLocal.token, {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (response) => {
            console.log(response);
            this.applicationList = response;
          }
        );
      }
    );
  }

  onAppSelect(index) {
    this.router.navigate(['admin/verify-new-applications', index]);
  }

}
