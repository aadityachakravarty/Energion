import { Component, Input, OnInit } from '@angular/core';

interface Marker {
  name?: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-base-map',
  templateUrl: './base-map.component.html',
  styleUrls: ['./base-map.component.css']
})
export class BaseMapComponent implements OnInit {
  @Input() label= 'you';

  constructor() { }
  lat: number;
  lng: number;
  dir: any;

  markers: Marker[] = [
    {
      name: 'delhi',
      lat: 28.7041,
      lng: 77.1025
    },
    {
      name: 'two',
      lat: 29.489934,
      lng: 79.327598
    },
    {
      name: 'three',
      lat: 29.489934,
      lng: 79.327566
    },
    {
      name: 'four',
      lat: 29.489922,
      lng: 79.327594
    },
    {
      name: 'five',
      lat: 29.489934,
      lng: 79.327334
    },
    {
      name: 'six',
      lat: 29.489977,
      lng: 79.327594
    },
    {
      name: 'seven',
      lat: 29.489331,
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
