import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


interface Marker {
  name?: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  constructor(private router: Router) { }

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

  onNewApplication() {
      this.router.navigate(['consumer/new-application']);
  }
  onUpdateApplication() {
      this.router.navigate(['consumer/update-application']);
  }
  onYourApplications() {
      this.router.navigate(['consumer/your-applications']);
  }

}

