import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/index.pages';
import { HttpClientModule } from '@angular/common/http';
import { ServicesProvider } from '../providers/services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularBootstrapToastsModule } from 'angular-bootstrap-toasts';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
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
