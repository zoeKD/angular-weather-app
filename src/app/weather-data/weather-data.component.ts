import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.css']
})
export class WeatherDataComponent implements OnInit {
  city: string;
  date = new Date();
  today = Date.now();
  data: any [];
  error: string;
  searchCity : FormControl = new FormControl();
  searchResult = [];

  constructor(private service: ApiService) {
    this.searchCity.valueChanges
        .debounceTime(200)
        .subscribe(data => {
            this.service.search_city(data).subscribe(response =>{
                this.searchResult = response;
            })
        })
  }

  ngOnInit() {
    this.city = "Paris";
    this.date = new Date();
    this.fetchData(this.city, this.date);
  }

  checkValidity(){
    if(Date.parse(this.date) > this.today) {
      this.error = "Please select a date in the past";
      this.data = null;
      return false
    }
    if(this.city != null && this.date != null) {
      return true
    } else {
      this.error = "Something went wrong";
      this.data = null;
    }
  }

  somethingChanged() {
    const that = this;
    setTimeout(function(){
      if(that.checkValidity()) {
        console.log(that.city)
        that.fetchData(that.city, that.date)
        that.error = "";
        }
    }, 200)
  }

  onSubmit() {
    console.log("submit");
    console.log(this.city);
    console.log(this.date);
    if(this.checkValidity()) {
      this.error = "";
      this.fetchData(this.city, this.date);
    }
  }

  fetchData(city, date): void {
    this.service.getWeatherData(city, date).subscribe(data => {
      if(data["history"]){
        this.data = data["history"]["observations"]
                    .map(item => { return {hour: item.date.hour, min: item.date.min, temp: Number.parseFloat(item.tempm)} });
      } else {
        this.data = null;
        this.error = "Something went wrong";
      }
    })
  }
}
