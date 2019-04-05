import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../assets/styles/cover.css']
})
export class RegisterComponent implements OnInit {
  loading: Boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private notif: NotificationService,
    private http: HttpClient,
    private router: Router
  ) { }

  regForm: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit() {
    this.title.setTitle('Register | Energion');
  }

  register() {
    this.loading = true;
    this.http.post('/api/auth/register', this.regForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('info', 'Please check your email.');
          this.loading = false;
          this.router.navigate(['/']);
        }
        else {
          this.loading = false;
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.loading = false;
        this.notif.fire('danger', err.message);
      }
    );
  }

  getValid(key) {
    let keyset = this.regForm.get(key);
    if ((keyset.dirty || keyset.touched)) {
      return keyset.valid;
    }
  }

  validConfirm() {
    let pass = this.regForm.get('password').value;
    let pass2 = this.regForm.get('passwordConfirm').value;
    return (pass != '' && pass2 != '') ? pass == pass2 : null;
  }

  validateForm() {
    return this.validConfirm() && this.regForm.valid;
  }
}
