import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reject',
  templateUrl: './reject.component.html',
  styleUrls: ['./reject.component.css']
})
export class RejectComponent implements OnInit {

  rejectForm: FormGroup;

  @Input() id;

  constructor(
    private http: HttpClient,
    private notif: NotificationService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.rejectForm = this.fb.group({
      id: [this.id, Validators.required],
      type: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  rejectApp() {
    this.http.post('/api/admin/rejectApplication', this.rejectForm.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
          this.activeModal.close({ 'rejected': true });
        }
        else {
          this.notif.fire('warning', res.msg);
          this.activeModal.close({ 'rejected': false });
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
      }
    )
  }

}
