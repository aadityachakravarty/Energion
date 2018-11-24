import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-application',
  templateUrl: './delete-application.component.html',
  styleUrls: ['./delete-application.component.css']
})
export class DeleteApplicationComponent implements OnInit {

  @Input() id;
  
  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  allowClose() {
    this.http.post('/api/connection/delete', { id: this.id }, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
          this.activeModal.close('success');
        }
        else {
          this.notif.fire('warning', res.msg);
          this.activeModal.close('fail');
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
        this.activeModal.close('fail');
      }
    );
  }
}
