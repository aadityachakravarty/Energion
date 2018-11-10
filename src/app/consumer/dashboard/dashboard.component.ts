import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Dashboard | Energion');
  }

  logout() {
    this.auth.logout();
  }
}
