import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EstimateComponent } from './estimate/estimate.component';
import { LoginGuard } from './auth/login.guard';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: SplashComponent },
  { path: 'estimate', pathMatch: 'full', component: EstimateComponent },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule', canActivateChild: [LoginGuard] },
  { path: 'consumer', loadChildren: './consumer/consumer.module#ConsumerModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
