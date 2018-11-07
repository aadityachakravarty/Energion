import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {
  closeConnectionData;
  id: number;
  constructor(private localStorage: AsyncLocalStorage, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    );
    console.log(this.id);

    this.localStorage.getItem('user').subscribe(
      (userLocal) => {
        console.log(userLocal);
        this.httpClient.post('https://api-egn.nvixion.tech/employee/apps', userLocal.token, {headers: new HttpHeaders({
            'x-access-token': userLocal.token
          })}).subscribe(
          (response) => {
            console.log(response);
            this.closeConnectionData = response[this.id];
            console.log(this.closeConnectionData);
          }
        );
      }
    );
  }

}
