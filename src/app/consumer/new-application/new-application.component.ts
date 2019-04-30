import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from 'src/app/title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private notif: NotificationService,
    private http: HttpClient,
    private title: TitleService,
    private router: Router
  ) { }

  application: FormGroup = this.fb.group({
    'applicantName': ['', Validators.required],
    'applicantPhone': ['', Validators.required],
    'applicantEmail': ['', [Validators.required, Validators.email]],
    'nominee': ['', Validators.required],
    'aadharNum': ['', Validators.required],
    'permanentAddress': ['', Validators.required],
    'connectionAddress': ['', Validators.required],
    // 'verificationDoc': ['', Validators.required],
    'loadDemand': ['', Validators.required],
    'connectionCategory': ['', Validators.required],
    'connectionType': ['', Validators.required],
    'voltageSupply': ['', Validators.required]
  });

  ngOnInit() {
    this.title.setTitle('New Application | Energion');
  }

  submitConnection() {
    this.http.post('/api/connection/new', this.application.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.router.navigate(['/consumer/view-applications']);
          this.notif.fire('success', res.msg);
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

  getValid(key) {
    let keyset = this.application.get(key);
    if ((keyset.dirty || keyset.touched)) {
      return keyset.valid;
    }
  }
}
