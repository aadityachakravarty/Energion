import { Component, OnInit } from '@angular/core';
import { UpdateApplication } from '../update-application.model';

@Component({
  selector: 'app-close-application',
  templateUrl: './close-application.component.html',
  styleUrls: ['./close-application.component.css']
})
export class CloseApplicationComponent implements OnInit {
  closeConnectionData: UpdateApplication = {
    'applicationNumber': 'LJXSDHT9879SDAF8',
    'applicantName': 'Anshul Sharma',
    'fatherName_husbandName': 'Satish Kumar',
    'aadharNumber': 600487597412,
    'mobileNumber': '9996999200',
    'email': 'anshulsharma0888@gmail.com',
    'meterNumber': 'MO245444565567',
    'permanentAddress': 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana',
    'connectionAddress': 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana',
    'loadDemand': 4,
    'connectionCategory': 'Domestic Supply (DS)',
    'connectionType': 'Permanent',
    'voltageSupply': '3 Phase'
  };
  constructor() { }

  ngOnInit() {
  }

}
