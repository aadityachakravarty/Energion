import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-closure-application',
  templateUrl: './closure-application.component.html',
  styleUrls: ['./closure-application.component.css']
})
export class ClosureApplicationComponent implements OnInit {
  @Input() id;

  closeForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private notif: NotificationService,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.closeForm = this.fb.group({
      id: [this.id, Validators.required],
      reason: ['', Validators.required]
    });
  }

  reqClose() {
    this.http.post('/api/connection/closure', this.closeForm.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
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
