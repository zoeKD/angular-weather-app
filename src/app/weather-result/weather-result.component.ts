import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  @Input() data: any []

  constructor() { }

  ngOnInit() {
  }

}
