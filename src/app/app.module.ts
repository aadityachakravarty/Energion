import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './splash/splash.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EstimateComponent } from './estimate/estimate.component';
import { MapComponent } from './estimate/map/map.component';
import { AlertsComponent } from './alerts/alerts.component';
import { NotificationService } from './alerts/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NotFoundComponent,
    EstimateComponent,
    MapComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  entryComponents: [
    MapComponent
  ],
  providers: [
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
