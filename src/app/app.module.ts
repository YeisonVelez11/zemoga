import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//declaraciones componentes
import { HomeComponent } from '../pages/index.pages';

import { HttpClientModule } from '@angular/common/http';
import { ServicesProvider } from '../providers/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';
import { CommonModule } from '@angular/common';
import * as _moment from 'moment';

@NgModule({
  declarations: [AppComponent, HomeComponent],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularBootstrapToastsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [ServicesProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
