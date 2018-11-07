import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyFinanceComponent } from './verify-finance/verify-finance.component';
import { TechComponent } from './tech/tech.component';
import { AdminRoutingModule } from './admin-routing.module';
import { VerifyNewApplicationsComponent } from './verify-finance/verify-new-applications/verify-new-applications.component';
import { VerifyNewApplicationsPreviewComponent } from './verify-finance/verify-new-applications-preview/verify-new-applications-preview.component';
import { VerifyCompletedApplicationsPreviewComponent } from './verify-finance/verify-completed-applications-preview/verify-completed-applications-preview.component';
import { VerifyCompletedApplicationsComponent } from './verify-finance/verify-completed-applications/verify-completed-applications.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [
    VerifyFinanceComponent,
    TechComponent,
    VerifyNewApplicationsComponent,
    VerifyNewApplicationsPreviewComponent,
    VerifyCompletedApplicationsPreviewComponent,
    VerifyCompletedApplicationsComponent],
  exports: [

  ]
})
export class AdminModule { }
