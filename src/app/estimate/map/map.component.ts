import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() data;

  mapUrl: string;
  safeMapUrl: any;

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.mapUrl = `https://www.google.com/maps/embed/v1/directions?origin=${this.data.coordinates.customer.lat},${this.data.coordinates.customer.lng}&destination=${this.data.coordinates.transformer.lat},${this.data.coordinates.transformer.lng}&key=AIzaSyCTxHU9LQsmd2QU2Fkiqq1i0G4hav6zM8E`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

}
