import { Component, OnInit } from '@angular/core';
import { UpdateApplication } from '../update-application.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-load',
  templateUrl: './change-load.component.html',
  styleUrls: ['./change-load.component.css']
})
export class ChangeLoadComponent implements OnInit {
  changeLoadData: UpdateApplication = {
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
  voltageSupplyDropdown = 'Select Option';
  constructor() { }
  changeLoadForm: FormGroup;
  ngOnInit() {
    this.changeLoadForm = new FormGroup({
      'newLoadDemand': new FormControl(null),
      'newVoltageSupply': new FormControl(null)
    });
  }

  onVoltageSupply(data: string) {
    this.voltageSupplyDropdown = data;
    this.changeLoadForm.patchValue({
      'newVoltageSupply': data
    });
  }

}
