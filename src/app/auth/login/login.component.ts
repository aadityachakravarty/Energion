import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/styles/cover.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loading: Boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  loginForm: FormGroup = this.fb.group({
    id: ['', Validators.required],
    password: ['', Validators.required]
  });

  ngOnInit() {
    this.title.setTitle('Login | Energion');
  }

  getValid(key) {
    let keyset = this.loginForm.get(key);
    if ((keyset.dirty || keyset.touched)) {
      return  keyset.valid;
    }
  }

  login() {
    this.loading = true;
    this.auth.loginUser(this.loginForm.value, () => {
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loading = false;
  }

}
