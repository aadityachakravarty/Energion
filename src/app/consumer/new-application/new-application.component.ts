import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {
  newApplicationForm: FormGroup
  constructor() { }

  ngOnInit() {
    this.newApplicationForm = new FormGroup({
      'applicantName': new FormControl(null),
      'fatherName_husbandName': new FormControl(null),
      'aadharNumber': new FormControl(null),
      'mobileNumber': new FormControl(null),
      'email': new FormControl(null),
      'permanentAddress': new FormControl(null),
      'connectionAddress': new FormControl(null),
      'connectionAddressLandDocument': new FormControl(null),
      'loadDemand': new FormControl(null),
      'connectionCategory': new FormControl(null),
      'connectionType': new FormControl(null),
      'voltageSupply': new FormControl(null)
    });
  }

}
