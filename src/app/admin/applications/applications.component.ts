import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';
import { TitleService } from 'src/app/title.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcceptComponent } from './accept/accept.component';
import { RejectComponent } from './reject/reject.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  data: any = [];
  filter: string = '';

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private title: TitleService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.title.setTitle('Applications | Energion Admin');
    this.getApplications('');
  }

  getApplications(filter: string) {
    this.http.get(`/api/admin/getApplications?filter=${filter}`, { headers: { 'x-access-token': localStorage.token } }).subscribe(
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

  acceptApplication(id: string) {
    const modalRef = this.modal.open(AcceptComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((res: any) => {
      if (res.accepted) {
        this.getApplications('');
      }
    });
  }

  rejectApplication(id: string) {
    const modalRef = this.modal.open(RejectComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((res: any) => {
      if (res.rejected) {
        this.getApplications('');
      }
    });
  }
}
