import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<any>();

  constructor(
  ) { }

  fire(style: string, message: string) {
    this.subject.next({ theme: style, text: message });
  }

  getNotifications(): Observable<any> {
    return this.subject.asObservable();
  }

}
