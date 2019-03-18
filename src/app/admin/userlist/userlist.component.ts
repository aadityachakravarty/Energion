import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  data: any = [];

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Users | Energion');
    this.getUsers();
  }

  getUsers() {
    this.http.get('/api/admin/getUsers', { headers: { 'x-access-token': localStorage.token } }).subscribe(
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

  changeLevel(id: string, level: number) {
    this.http.post('/api/admin/modifyAccess', { id: id, level: level }, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
          this.getUsers();
        }
        else {
          this.notif.fire('warning', res.msg);
          this.getUsers();
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    );
  }
}
