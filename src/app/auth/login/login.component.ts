import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Login | Energion');
  }

}
