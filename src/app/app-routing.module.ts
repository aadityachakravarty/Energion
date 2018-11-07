import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './core/main-home/main-home.component';
import { LogInComponent } from './core/auth/log-in/log-in.component';
import { SignUpComponent } from './core/auth/sign-up/sign-up.component';

const appRoutes: Routes = [
  { path: '', component: MainHomeComponent},
  { path: 'login', component: LogInComponent},
  { path: 'signup', component: SignUpComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
