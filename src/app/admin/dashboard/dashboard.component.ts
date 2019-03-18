import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  profile: any = JSON.parse(localStorage.profile);

  constructor(
    private auth: AuthService,
    private title: TitleService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  }

  logout() {
    this.auth.logout();
  }

}
