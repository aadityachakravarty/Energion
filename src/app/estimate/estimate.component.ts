import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {

  constructor(
    private title: TitleService
  ) { }

  ngOnInit() {
    this.title.setTitle('Get Estimate | Energion');
  }

}
