import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  profile: any = JSON.parse(sessionStorage.profile);

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    if (!sessionStorage.profile) {
      this.auth.getProfile();
    }
  }

  logout() {
    this.auth.logout();
  }

}
