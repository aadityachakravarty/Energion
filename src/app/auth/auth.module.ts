import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forgot',
    component: ForgotComponent
  },
  {
    path: 'verify/:user/:code',
    component: VerifyComponent
  },
  {
    path: 'reset-pass/:user/:code',
    component: ResetPassComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    VerifyComponent,
    ResetPassComponent
  ]
})
export class AuthModule { }
