import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyFinanceComponent } from './verify-finance/verify-finance.component';
import { TechComponent } from './tech/tech.component';
import { VerifyNewApplicationsComponent } from './verify-finance/verify-new-applications/verify-new-applications.component';
import { VerifyNewApplicationsPreviewComponent } from './verify-finance/verify-new-applications-preview/verify-new-applications-preview.component';
import { VerifyCompletedApplicationsComponent } from './verify-finance/verify-completed-applications/verify-completed-applications.component';
import { VerifyCompletedApplicationsPreviewComponent } from './verify-finance/verify-completed-applications-preview/verify-completed-applications-preview.component';

const adminRoutes: Routes = [
  { path: 'admin/verify-finance', component: VerifyFinanceComponent},
  { path: 'admin/verify-new-applications', component: VerifyNewApplicationsComponent},
  { path: 'admin/verify-new-applications/:id', component: VerifyNewApplicationsPreviewComponent},
  { path: 'admin/verify-completed-applications', component: VerifyCompletedApplicationsComponent},
  { path: 'admin/verify-completed-applications/:id', component: VerifyCompletedApplicationsPreviewComponent},
  { path: 'admin/tech', component: TechComponent}
]

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule {}
