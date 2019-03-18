import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.css']
})
export class AcceptComponent implements OnInit {

  @Input() id;

  linemanForm: FormGroup;

  linemen: any = [];

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private notif: NotificationService
  ) { }

  ngOnInit() {
    this.linemanForm = this.fb.group({
      id: [this.id, Validators.required],
      lineman: ['', Validators.required]
    });
    this.getLinemen();
  }

  acceptApp() {
    this.http.post('/api/admin/approveApplication', this.linemanForm.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
          this.activeModal.close({'accepted': true});
        }
        else {
          this.notif.fire('warning', res.msg);
          this.activeModal.close({'accepted': false});
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    );
  }

  getLinemen() {
    this.http.get('/api/admin/getLineman', { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.linemen = res.data;
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
}
