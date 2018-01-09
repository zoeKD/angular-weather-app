import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  city: String;
  date: String;
  today = Date.now();
  data: any [];
  error: String;
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
  }

  somethingChanged() {
    if(Date.parse(this.date) >= this.today) {
      this.error = "Please select a date in the past"
    }
    if(this.city != null && this.date != null) {
      this.fetchData(this.city, this.date)
    }
  }

  onSubmit() {
    console.log(this.city)
    if(this.city != null && this.date != null) {
      this.fetchData(this.city, this.date)
    }
  }

  fetchData(city, date): void {
    this.service.getWeatherData(city, date).subscribe(data => {
      this.data = data["history"]["observations"];
    })
  }
}
