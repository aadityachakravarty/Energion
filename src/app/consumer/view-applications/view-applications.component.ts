import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})
export class ViewApplicationsComponent implements OnInit {

  data: any = [];

  constructor(
    private title: TitleService,
    private notif: NotificationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.title.setTitle('My Connections | Energion');
    this.getConnections();
  }

  getConnections() {
    this.http.get('/api/connection/my', { headers: { 'x-access-token': localStorage.token }}).subscribe(
      (res: any) => {
        if (res.success) {
          this.data = res.data;
        }
        else {
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    );
  }

  deleteReq(id) {
    console.log(id);
  }

}
