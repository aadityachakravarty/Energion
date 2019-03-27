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
    this.mapUrl = `https://www.google.com/maps/embed/v1/directions?origin=${this.data.location.client.lat},${this.data.location.client.lng}&destination=${this.data.location.station.lat},${this.data.location.station.lng}&key=AIzaSyBJxizINy5Os6SOrzivwXHtyw2ghNI639M`;
    this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.mapUrl);
  }

}
