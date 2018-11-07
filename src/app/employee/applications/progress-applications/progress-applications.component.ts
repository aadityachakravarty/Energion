import { Component, OnInit } from '@angular/core';

interface Marker {
  name?: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-progress-applications',
  templateUrl: './progress-applications.component.html',
  styleUrls: ['./progress-applications.component.css']
})
export class ProgressApplicationsComponent implements OnInit {


  newApplicationPreview = {
    'applicationNumber': 'URJDJCXKW99449WKD',
    'applicantName': 'Anshul Sharma',
    'fatherName_husbandName': 'Satish Kumar',
    'mobileNumber': '9996999200',
    'email': 'anshulsharma0888@gmail.com',
    'meterNumber': 'APDUR849R9583',
    'connectionAddress': 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana',
    'loadDemand': 4,
    'connectionCategory': 'Domestic Supply (DS)',
    'connectionType': 'Permanent',
    'voltageSupply': '3 Phase',
    'status': 'new' //  status for backend
  };
  constructor() { }
  lat: number;
  lng: number;
  dir: any;

  markers: Marker[] = [
    {
      name: 'one',
      lat: 29.489934,
      lng: 79.327594
    }
  ]
  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

      });
    }
  }

  public clickedMarker(markers: Marker, index: number ) {
    this.getDirection(markers.lat, markers.lng);
    this.calculateDistance(markers.lat, markers.lng);
  }

  public getDirection(latitude: number, longitude: number) {
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: latitude, lng: longitude }
    };
  }

  public calculateDistance( latitude: number, longitude: number) {
    const nyc = new google.maps.LatLng(this.lat, this.lng);
    const london = new google.maps.LatLng(latitude, longitude);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london);
    console.log(distance);
  }
}
