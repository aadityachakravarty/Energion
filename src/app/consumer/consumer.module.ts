import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewApplicationComponent } from './new-application/new-application.component';
import { AuthGuard } from '../auth/auth.guard';

const conRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'new-application',
        component: NewApplicationComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(conRoutes)
  ],
  declarations: [
    DashboardComponent,
    NewApplicationComponent
  ]
})
export class ConsumerModule { }
