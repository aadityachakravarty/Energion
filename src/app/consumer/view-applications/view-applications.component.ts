import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferApplicationComponent } from '../transfer-application/transfer-application.component';
import { ClosureApplicationComponent } from '../closure-application/closure-application.component';
import { DeleteApplicationComponent } from '../delete-application/delete-application.component';

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
    private http: HttpClient,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.title.setTitle('My Connections | Energion');
    this.getConnections();
  }

  getConnections() {
    this.http.get('/api/connection/my', { headers: { 'x-access-token': localStorage.token } }).subscribe(
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
    const modalRef = this.modal.open(DeleteApplicationComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((reason) => {
      if (reason) {
        this.getConnections();
      }
    });
  }

  transferCon(id) {
    const modalRef = this.modal.open(TransferApplicationComponent);
    modalRef.componentInstance.id = id;
  }

  closureCon(id) {
    const modalRef = this.modal.open(ClosureApplicationComponent);
    modalRef.componentInstance.id = id;
  }

}
