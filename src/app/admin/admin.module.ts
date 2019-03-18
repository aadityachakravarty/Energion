import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LinemanComponent } from './lineman/lineman.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UserlistComponent } from './userlist/userlist.component';

const adRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
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
        path: 'linemen',
        component: LinemanComponent
      },
      {
        path: 'userlist',
        component: UserlistComponent
      }
    ]
  },
];

@NgModule({
  declarations: [DashboardComponent, LinemanComponent, ApplicationsComponent, UserlistComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(adRoutes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
