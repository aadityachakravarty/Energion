import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('404 | Energion');
  }

}
