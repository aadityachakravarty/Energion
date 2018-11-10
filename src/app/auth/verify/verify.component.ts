import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/alerts/notification.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private notif: NotificationService
  ) { }

  snap: any = this.activatedRoute.snapshot.params;

  ngOnInit() {
    this.http.get(`/api/auth/verify/${this.snap.user}/${this.snap.code}`).subscribe(
      (res: any) => {
        if (res.success) {
          this.notif.fire('success', 'Account Verified.');
          this.router.navigate(['/auth/login']);
        }
        else {
          this.notif.fire('warning', res.msg);
          this.router.navigate(['/auth/login']);
        }
      },
      (err) => {
        this.notif.fire('danger', err.message);
        this.router.navigate(['/auth/login']);
      }
    )
  }

}
