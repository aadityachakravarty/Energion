import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApplicationsComponent } from './applications/applications.component';
import { UserlistComponent } from './userlist/userlist.component';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { AcceptComponent } from './applications/accept/accept.component';
import { RejectComponent } from './applications/reject/reject.component';
import { AdminGuard } from '../auth/admin.guard';

const adRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'applications'
      },
      {
        path: 'applications',
        pathMatch: 'full',
        component: ApplicationsComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    ApplicationsComponent,
    UserlistComponent,
    AcceptComponent,
    RejectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
    AcceptComponent,
    RejectComponent
  ]
})
export class AdminModule { }
