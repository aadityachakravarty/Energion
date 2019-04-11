import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { NotificationService } from '../alerts/notification.service';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css', '../../assets/styles/cover.css']
})
export class EstimateComponent implements OnInit {

  public token = localStorage.token;
  loading: boolean = false;
  locationAccess: boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal,
    private notif: NotificationService
  ) { }

  estForm: FormGroup = this.fb.group({
    address: [""],
    load: ["", Validators.required],
    location: {
      lat: ["", Validators.required],
      lng: ["", Validators.required]
    }
  });

  getEstimate() {
    this.loading = true;
    this.http.post('/api/estimate/evaluate', this.estForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.loading = false;
          const modalRef = this.modalService.open(MapComponent, { size: 'lg' });
          modalRef.componentInstance.data = res.data;
        }
        else {
          this.loading = false;
          this.notif.fire('warning', res.msg);
        }
      },
      (err) => {
        this.loading = false;
        this.notif.fire('danger', err.message);
      }
    );
  }

  ngOnInit() {
    this.title.setTitle('Get Estimate | Energion');
    this.getLocation();
  }

  setLocation(location) {
    this.estForm.patchValue({
      location
    });
  }

  getAddresses() {
    this.loading = true;
    this.http.post('/api/estimate/getAddressInfo', this.estForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          if (res.data.length == 1) {
            let selectedLoc = res.data[0];
            this.setLocation(selectedLoc.location);
          }
          else {
            this.notif.fire('warning', 'Please be more specific.');
          }
          this.loading = false;
        }
        else {
          this.notif.fire('warning', res.msg);
          this.loading = false;
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
        this.loading = false;
      }
    )
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let location = {
          "lng": position.coords.longitude,
          "lat": position.coords.latitude
        }
        this.locationAccess = true;
        this.setLocation(location);
      });
    }
    else {
      this.notif.fire('danger', 'Location API not supported.');
    }
  }

  getValid(key) {
    let keyset = this.estForm.get(key);
    if ((keyset.dirty || keyset.touched)) {
      return  keyset.valid;
    }
  }

}
