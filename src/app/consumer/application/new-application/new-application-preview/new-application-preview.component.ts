import { Component, OnInit } from '@angular/core';
import { NewApplication } from '../new-application.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from '../../../consumer.service';

@Component({
  selector: 'app-new-application-preview',
  templateUrl: './new-application-preview.component.html',
  styleUrls: ['./new-application-preview.component.css']
})
export class NewApplicationPreviewComponent implements OnInit {
  newApplicationPreview: any;
  // = {
  //   'applicantName': 'Anshul Sharma',
  //   'fatherName_husbandName': 'Satish Kumar',
  //   'aadharNumber': 600487597412,
  //   'mobileNumber': '9996999200',
  //   'email': 'anshulsharma0888@gmail.com',
  //   'permanentAddress': 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana',
  //   'connectionAddress': 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana',
  //   'connectionAddressLandDocument': 'ASD33434A34RLW',
  //   'loadDemand': 4,
  //   'connectionCategory': 'Domestic Supply (DS)',
  //   'connectionType': 'Permanent',
  //   'voltageSupply': '3 Phase'
  // };
  constructor(private router: Router, private route: ActivatedRoute, private consumerService: ConsumerService) { }

  ngOnInit() {
    this.consumerService.newApplicationFormData.subscribe(
      (newAppData) => {
        console.log(newAppData);
        this.newApplicationPreview = newAppData;
        console.log(this.newApplicationPreview);
      }
    );
  }

  onEditApplication() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmitAppliation() {
    // this.consumerService.onNewApplication()
    this.router.navigate(['consumer/home']);
  }

}
