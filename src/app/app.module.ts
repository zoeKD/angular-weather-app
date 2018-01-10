import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { D3, D3Service } from 'd3-ng2-service';
import * as d3 from 'd3';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { DatePipe } from '@angular/common';



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
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    HttpModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [ApiService,
    D3Service,
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
