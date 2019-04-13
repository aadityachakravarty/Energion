import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  info: any = {};

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.getInfo().then((res: any) => {
      delete res.data.level;
      this.info = res.data;
    });
  }

}
