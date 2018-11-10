import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit, OnDestroy {

  constructor(
    private notification: NotificationService
  ) {
    this.subscription = this.notification.getNotifications().subscribe(
      (message) => {
        if (message.text) {
          this._success.next(message);
        }
      }
    );
  }

  private _success = new Subject<any>();

  staticAlertClosed = false;
  theme: string;
  alert: string;
  subscription: Subscription;

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => {
      this.theme = message.theme;
      this.alert = message.text;
    });
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.alert = null);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
