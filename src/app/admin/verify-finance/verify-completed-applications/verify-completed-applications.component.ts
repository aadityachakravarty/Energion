import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-verify-completed-applications',
  templateUrl: './verify-completed-applications.component.html',
  styleUrls: ['./verify-completed-applications.component.css']
})
export class VerifyCompletedApplicationsComponent implements OnInit {

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
    this.router.navigate(['admin/verify-completed-applications', index]);
  }
}
