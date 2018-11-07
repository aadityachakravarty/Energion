import { Component, OnInit } from '@angular/core';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private localStorage: AsyncLocalStorage) { }
notiUser;
  ngOnInit() {
    this.localStorage.getItem('user').subscribe(
      (data) => {
        this.notiUser = data.username;
      }
    );
  }

}
