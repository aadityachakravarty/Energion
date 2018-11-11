import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css', '../../../assets/styles/cover.css']
})
export class ResetPassComponent implements OnInit {

  loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private notif: NotificationService,
    private router: Router,
    private title: TitleService,
    private activatedRoute: ActivatedRoute
  ) { }

  resetForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  });

  ngOnInit() {
    this.title.setTitle('Reset Password | Energion');
  }

  reset() {
    if (this.resetForm.value.password != this.resetForm.value.passwordConfirm) {
      this.notif.fire('danger', 'Passwords do not match.');
    }
    else {
      this.loading = true;
      let details = this.activatedRoute.snapshot.params;
      this.http.post(`/api/auth/reset/${details.user}/${details.code}`, this.resetForm.value).subscribe(
        (res: any) => {
          if (res.success) {
            this.notif.fire('info', res.msg);
            this.loading = false;
            this.router.navigate(['/auth/login']);
          }
          else {
            this.notif.fire('warning', res.msg);
            this.loading = false;
          }
        },
        (err) => {
          this.notif.fire('danger', err.message);
          this.loading = false;
        }
      );
    }
  }
}
