import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AuthGuard } from '../auth/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ViewApplicationsComponent } from './view-applications/view-applications.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    FormsModule
  ],
  declarations: [
    DashboardComponent,
    NewApplicationComponent,
    ProfileComponent,
    ViewApplicationsComponent
  ]
})
export class ConsumerModule { }
