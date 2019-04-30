import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: any = {};

  constructor(
    private auth: AuthService,
    public ngp: NgProgress
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
