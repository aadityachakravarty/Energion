import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: any = JSON.parse(localStorage.profile);

  constructor(
    private auth: AuthService,
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Dashboard | Energion');
    this.auth.getInfo().then((res: any) => {
      this.profile.admin = res.data.admin;
    });
  }

  logout() {
    this.auth.logout();
  }
}
