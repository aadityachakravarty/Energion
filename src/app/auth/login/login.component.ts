import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  login() {
    this.auth.loginUser(this.loginForm.value);
  }

}
