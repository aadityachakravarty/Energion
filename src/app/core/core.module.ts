import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md/index';
import { MainHomeComponent } from './main-home/main-home.component';
import { AppRoutingModule } from '../app-routing.module';
import { CoreRoutingModule } from './core-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { } from '@types/googlemaps';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';


@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule,
    AppRoutingModule,
    CoreRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD1lxsfuO9r6EIJ7-CCsp7ebk4Fhbsc9iM', libraries: ['geometry']
    }),
    AgmDirectionModule,
    AsyncLocalStorageModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SignUpComponent,
    LogInComponent,
    MainHomeComponent
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    FooterComponent,
    LogInComponent
  ]
})
export class CoreModule { }
