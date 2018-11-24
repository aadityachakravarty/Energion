import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';

@Component({
  selector: 'app-transfer-application',
  templateUrl: './transfer-application.component.html',
  styleUrls: ['./transfer-application.component.css']
})
export class TransferApplicationComponent implements OnInit {
  @Input() id;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private http: HttpClient,
    private notif: NotificationService
  ) { }

  transForm: FormGroup;

  ngOnInit() {
    this.transForm = this.fb.group({
      id: [this.id, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required]
    });
  }

  reqtrans() {
    this.http.put('/api/connection/transfer', this.transForm.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.activeModal.dismiss('success');
          this.notif.fire('success', res.msg)
        }
        else {
          this.activeModal.dismiss('non-success');
          this.notif.fire('warning', res.msg)
        }
      },
      (err) => {
        this.activeModal.dismiss('fail');
        this.notif.fire('danger', err.message);
      }
    );
  }

}
