import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/alerts/notification.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
    if (this.regForm.value.password != this.regForm.value.passwordConfirm) {
      this.notif.fire('danger', 'Passwords do not match.'); 
    }
    else {
      this.http.post('/api/auth/register', this.regForm.value).subscribe(
        (res: any) => {
          if (res.success) {
            this.notif.fire('info', 'Please check your email.'); 
            this.router.navigate(['/auth/login']);
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
}
