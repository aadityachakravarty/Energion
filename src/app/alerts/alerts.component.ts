import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor() { }

  private _success = new Subject<string>();

  staticAlertClosed = false;
  alert: string;

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.alert = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.alert = null);
  }

  public fireAlert(msg) {
    this._success.next(msg);
  }
}
