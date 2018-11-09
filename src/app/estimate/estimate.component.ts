import { Component, OnInit } from '@angular/core';
import { TitleService } from '../title.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.css']
})
export class EstimateComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private title: TitleService,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal
  ) { }

  estForm: FormGroup = this.fb.group({
    address: ['', Validators.required],
    capacity: ['', Validators.required]
  });

  getEstimate() {
    this.loading = true;
    this.http.post('/api/matrix/est', this.estForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.loading = false;
          const modalRef = this.modalService.open(MapComponent, { size: 'lg' });
          modalRef.componentInstance.data = res.nodes;
        }
        else {
          this.loading = false;
          console.log(res.msg);
        }
      },
      (err) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.title.setTitle('Get Estimate | Energion');
  }

}
