import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  city: string;
  date: string;
  today = Date.now();
  data: any [];
  error: string;
  searchCity : FormControl = new FormControl();
  searchResult = [];

  constructor(private service: ApiService) {
    this.searchCity.valueChanges
        .debounceTime(400)
        .subscribe(data => {
            this.service.search_city(data).subscribe(response =>{
                this.searchResult = response;
            })
        })
  }

  ngOnInit() {
    this.city = "Paris";
    this.date = "2018-01-01";
    this.fetchData(this.city, this.date);
  }

  somethingChanged() {
    if(Date.parse(this.date) >= this.today) {
      this.error = "Please select a date in the past";
    }
    this.service.search_city(this.city).subscribe(response =>{
                this.searchResult = response;
            })
    console.log(this.searchResult.some(result => result.toLowerCase().includes(this.city.toLowerCase() + ",")))
    if(this.city != null && this.date != null && this.searchResult.some(result => result.toLowerCase().includes(this.city.toLowerCase() + ","))) {
      this.fetchData(this.city, this.date)
      this.error = "";
    }
  }

  onSubmit() {
    if(this.city != null && this.date != null) {
      this.error = "";
      this.fetchData(this.city, this.date);
    }
  }

  fetchData(city, date): void {
    this.service.getWeatherData(city, date).subscribe(data => {
      if(data["history"]){
        this.data = data["history"]["observations"]
                    .map(item => { return {hour: item.date.hour, min: item.date.min, temp: Number.parseFloat(item.tempm)} });
        console.log(data);
      } else {
        this.data = null;
        this.error = "Something went wrong";
      }
    })
  }
}
