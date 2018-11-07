import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-applications-list',
  templateUrl: './employee-applications-list.component.html',
  styleUrls: ['./employee-applications-list.component.css']
})
export class EmployeeApplicationsListComponent implements OnInit {
  teal = false;
  indigo = false;
  amber = false;
  red = false;
  applicationViewData = [
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' },
    { applicationNumber: 'JNGESF9589JASFA', applicantName: 'Anshul Sharma', mobile: 9996999200, connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana', status: 'new' }
  ]

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.applicationViewData.forEach(
      (element) => {
        switch (element.status) {
          case 'new' :
            this.indigo = true;
            break;
          case 'progress':
            this.amber = true;
            break;
          case 'priority':
            this.red = true;
            break;
          case 'completed':
            this.teal = true;
            break;
        }
      }
    );
  }


  onView(index: number) {
    this.router.navigate(['../', index], {relativeTo: this.route});
  }

}
