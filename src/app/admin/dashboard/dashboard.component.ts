import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: any = {};

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.getInfo().then((res: any) => {
      delete res.data.level;
      this.profile = res.data;
    });
  }

  logout() {
    this.auth.logout();
  }
}
