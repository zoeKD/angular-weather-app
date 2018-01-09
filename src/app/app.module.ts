import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';


import { AppComponent } from './app.component';
import { WeatherDataComponent } from './weather-data/weather-data.component';
import { WeatherResultComponent } from './weather-result/weather-result.component';
import { ApiService } from './api.service';


@NgModule({
  declarations: [
    AppComponent,
    WeatherDataComponent,
    WeatherResultComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
