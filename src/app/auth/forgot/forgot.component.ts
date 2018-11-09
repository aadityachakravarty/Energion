import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Forgot Password | Energion');
  }

}
