import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private title: TitleService,
    private http: HttpClient,
    private notif: NotificationService
  ) { }

  passForm: FormGroup = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    newPasswordConfirm: ['', Validators.required]
  });

  ngOnInit() {
    this.title.setTitle('Change Password | Energion');
  }

  changePass() {
    this.http.post('/api/auth/change-password', this.passForm.value, { headers: { 'x-access-token': localStorage.token } }).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', res.msg);
        }
        else {
          this.notif.fire('warning', res.msg);
        }
      },
      (err: any) => {
        this.notif.fire('danger', err.message);
      }
    );
  }

  getValid(key) {
    let keyset = this.passForm.get(key);
    if ((keyset.dirty || keyset.touched)) {
      return keyset.valid;
    }
  }

  validConfirm() {
    let pass = this.passForm.get('newPassword').value;
    let pass2 = this.passForm.get('newPasswordConfirm').value;
    return (pass != '' && pass2 != '') ? pass == pass2 : null;
  }

  validateForm() {
    return this.validConfirm() && this.passForm.valid;
  }
}
