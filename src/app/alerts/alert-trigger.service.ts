import { Injectable } from '@angular/core';
import { AlertsComponent } from './alerts.component';

@Injectable({
  providedIn: 'root'
})
export class AlertTriggerService {

  constructor(
    private alert: AlertsComponent
  ) { }
  triggerAlert(msg: any) {
    this.alert.fireAlert(msg);
  }
}
