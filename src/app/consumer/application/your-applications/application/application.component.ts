import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConsumerService } from '../../../consumer.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  closeConnectionData;
  constructor(private route: ActivatedRoute, private consumerService: ConsumerService, private localStorage: AsyncLocalStorage, private httpClient: HttpClient) { }
  id: number;
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
          }
        );
      }
    );



  }

}
