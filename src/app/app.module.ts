import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeComponent} from "./Views/home/home.component";
import {SignInComponent} from "./Views/sign-in/sign-in.component";
import {FloatingWidgetComponent} from "./Views/Widgets/floating-widget/floating-widget.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegistrationComponent } from './Views/registration/registration.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ListServicesService} from "./Views/home/list-services.service";
import { ApplicationStatusComponent } from './Views/application-status/application-status.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    FloatingWidgetComponent,
    RegistrationComponent,
    ApplicationStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [ListServicesService,HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
