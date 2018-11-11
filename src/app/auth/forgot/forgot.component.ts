import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css', '../../../assets/styles/cover.css']
})
export class ForgotComponent implements OnInit {

  loading: Boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private notif: NotificationService
  ) { }

  forgotForm: FormGroup = this.fb.group({
    id: ['', Validators.required]
  });

  ngOnInit() {
    this.title.setTitle('Forgot Password | Energion');
  }

  forgotPass() {
    this.loading = true;
    this.http.post('/api/auth/forgot', this.forgotForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
          this.loading = false;
        }
        else {
          this.notif.fire('warning', res.msg);
          this.loading = false;
        }
      },
      (err) => {
        this.notif.fire('warning', err.message);
        this.loading = false;
      }
    )
  }

}
