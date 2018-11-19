import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {

  profile: any = JSON.parse(localStorage.profile);

  constructor(
    private fb: FormBuilder,
    private notif: NotificationService,
    private http: HttpClient,
    private title: TitleService
  ) { }

  application: FormGroup = this.fb.group({
    'applicantName': [this.profile.name, Validators.required],
    'applicantPhone': [this.profile.phone, Validators.required],
    'applicantEmail': [this.profile.email, Validators.required],
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
    this.http.post('/api/connection/new', this.application.value, { headers:{ 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
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
}
