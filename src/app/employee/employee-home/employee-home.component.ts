import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onNewApplications() {
    this.router.navigate(['employee/new-applications/list']);
  }

  onProgressApplications() {
    this.router.navigate(['employee/progress-applications/list']);
  }

  onPriorityApplications() {
    this.router.navigate(['employee/priority-applications/list']);
  }

  onCompletedApplications() {
    this.router.navigate(['employee/completed-applications/list']);
  }

  onBaseMap() {
    this.router.navigate(['/']);
  }

  onRulesRegulations() {
    this.router.navigate(['/']);
  }

}
