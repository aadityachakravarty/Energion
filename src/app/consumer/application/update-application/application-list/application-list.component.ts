import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applicationList = [
    { name: 'Anshul Sharma', connectionAddress: 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana' },
    { name: 'Shivam Arora', connectionAddress: '55, Moti Nagar, New Delhi' },
    { name: 'Lokesh Manchanda', connectionAddress: '2, Sector - 7 Karnal, Haryana' },
    { name: 'Lakshay Chhabra', connectionAddress: '42, Sector - 25, Huda, Panipat, Haryana' },
    { name: 'Aaditya Chakravarty', connectionAddress: 'R-82, Ganga Trevini, Rohini, New Delhi' }
  ];
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSelectApplication(index: number) {
    this.router.navigate([index], {relativeTo: this.route});
  }

}
