import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { EstimateService } from './estimate.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit {
  costEstimationForm: FormGroup;
  mapOrigin: any;
  mapDestination: any;
  mapUrl: string;
  safeMapUrl: any;
  onMapShow = false;
  estimatedCost: number;
  serviceProvider: string;


  constructor(private sanatizer: DomSanitizer, private estimateService: EstimateService) {
  }

  ngOnInit() {
    this.costEstimationForm = new FormGroup({
      'address': new FormControl(null, [Validators.required]),
      'capacity': new FormControl(null),
      'phone': new FormControl(null)
    });
  }

  onEstimateSubmit() {
    const address = this.costEstimationForm.value;
      console.log(address);
    this.estimateService.onEstimate(address).subscribe(
      resData => {
        const response = JSON.parse(JSON.stringify(resData));
        console.log(response);
        this.mapOrigin = response.coordinates.customer;
        this.mapDestination = response.coordinates.transformer;
        this.serviceProvider = response.provider;
        this.estimatedCost = response.estimatedCost;
        this.mapUrl = '//www.google.com/maps/embed/v1/directions?origin=' + this.mapOrigin.lat + ',' + this.mapOrigin.lng +
          '&destination=' + this.mapDestination.lat + ',' + this.mapDestination.lng +
          '&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E';
        this.safeMapUrl = this.sanatizer.bypassSecurityTrustResourceUrl(this.mapUrl);
        this.onMapShow = true;
      }
    );

  }

}
