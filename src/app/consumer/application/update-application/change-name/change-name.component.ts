import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateApplication } from '../update-application.model';
@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.component.html',
  styleUrls: ['./change-name.component.css']
})
export class ChangeNameComponent implements OnInit {
  changeNameData: UpdateApplication = {
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

  changeNameForm: FormGroup;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.changeNameForm = new FormGroup({
      'newUserEmail': new FormControl(null)
    });
  }

  onChangeName() {
    console.log(this.changeNameForm);
    this.router.navigate(['consumer/home']);
  }

}
