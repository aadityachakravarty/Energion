import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {} from '@types/googlemaps';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import { ConsumerService } from '../../consumer.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';

interface Marker {
  name?: string;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {
  newApplicationForm: FormGroup;
  connectionCategoryDropdown = 'Select Option';
  connectionTypeDropdown = 'Select Option';
  voltageSupplyDropdown = 'Select Option';
  permanentAddressDropdown = 'Select Address';
  permanentAddressValue = 'L-482, Ram Lal Chowk, Model Town, Panipat, Haryana';

  newApplicationPreview;


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

  mapAdd;
  mapUrl;
  safeMapUrl;
  localUserData;

  // mapUrl = '//www.google.com/maps/embed/v1/directions?origin=' + this.mapOrigin +
  //   '&destination=' + this.mapDestination + '&zoom=13&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E';
  onMapDefault() {
    this.mapUrl = '//www.google.com/maps/embed/v1/place?q=' + 'current location' +
      '&zoom=17&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E';
    this.safeMapUrl = this.sanatizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }
  onMap() {
    if(this.mapAdd === '') {
      this.onMapDefault();
    } else {
      this.mapUrl = '//www.google.com/maps/embed/v1/place?q=' + this.mapAdd +
        '&zoom=17&attribution_source=Google+Maps+Embed+API&attribution_web_url=https://developers.google.com/maps/documentation/embed/&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E';
      this.safeMapUrl = this.sanatizer.bypassSecurityTrustResourceUrl(this.mapUrl);
    }
  }
fileName: any;
  @ViewChild('file') file: any;

  onShowFile() {
    this.fileName = this.file.files;
    console.log(this.fileName);
  }
  constructor(private router: Router, private route: ActivatedRoute, public sanatizer: DomSanitizer, private httpClient: HttpClient, private consumerService: ConsumerService, private localStorage: AsyncLocalStorage) { }

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
this.fileName = 'Browse';
    this.getUserLocation();
    console.log('running');
    this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?address=Hyderabad&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E').subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
    this.onMapDefault();

  }

  onPermanentAddress(data: string) {
    this.permanentAddressDropdown = data;
    this.newApplicationForm.patchValue({
      'permanentAddress': data
    });
  }

  onConnectionCategory(data: string) {
    this.connectionCategoryDropdown = data;
    this.newApplicationForm.patchValue({
      'connectionCategory': data
    });
  }

  onConnectionType(data: string) {
    this.connectionTypeDropdown = data;
    this.newApplicationForm.patchValue({
      'connectionType': data
    });
  }

  onVoltageSupply(data: string) {
    this.voltageSupplyDropdown = data;
    this.newApplicationForm.patchValue({
      'voltageSupply': data
    });
  }

  onNewApplicationForm() {
    console.log(this.newApplicationForm.value);
    this.newApplicationPreview = this.newApplicationForm.value;
    // this.consumerService.newApplicationFormData.next(this.newApplicationForm.value);
  }

  onFinalSubmit() {
    this.localStorage.getItem('user').subscribe(
      (local) => {
        this.localUserData = local;
        console.log(local);
        this.httpClient.post('https://api-egn.nvixion.tech/connection/new', this.newApplicationForm.value, {headers: new HttpHeaders({
            'x-access-token': local.token
          })}).subscribe(
          (newAppData) => {
            console.log(newAppData);
          }
        );
      }
    );

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
