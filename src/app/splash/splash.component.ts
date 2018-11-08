import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Energion | Welcome');
  }

}
