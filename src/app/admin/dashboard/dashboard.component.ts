import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  profile: any = JSON.parse(localStorage.profile);

  constructor(
    private auth: AuthService,
    private title: TitleService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.title.setTitle('Admin | Energion');
  }

  logout() {
    this.auth.logout();
  }

}
