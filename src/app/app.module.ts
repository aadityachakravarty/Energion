import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SplashComponent } from './splash/splash.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { EstimateComponent } from './estimate/estimate.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    NotFoundComponent,
    EstimateComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
