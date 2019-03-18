import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransferApplicationComponent } from './transfer-application/transfer-application.component';
import { ClosureApplicationComponent } from './closure-application/closure-application.component';
import { DeleteApplicationComponent } from './delete-application/delete-application.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const conRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProfileComponent
      },
      {
        path: 'new-application',
        component: NewApplicationComponent
      },
      {
        path: 'view-applications',
        component: ViewApplicationsComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(conRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    NewApplicationComponent,
    ProfileComponent,
    ViewApplicationsComponent,
    TransferApplicationComponent,
    ClosureApplicationComponent,
    DeleteApplicationComponent
  ],
  entryComponents: [
    TransferApplicationComponent,
    ClosureApplicationComponent,
    DeleteApplicationComponent
  ]
})
export class ConsumerModule { }
