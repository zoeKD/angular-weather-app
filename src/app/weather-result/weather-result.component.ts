import { Component, ElementRef, NgZone, OnDestroy, OnInit, Input } from '@angular/core';
import {
  D3Service,
  D3,
  Axis,
  BrushBehavior,
  BrushSelection,
  D3BrushEvent,
  ScaleLinear,
  ScaleOrdinal,
  Selection,
  Transition
} from 'd3-ng2-service';
import * as d3 from 'd3';

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})

export class WeatherResultComponent implements OnInit {
  @Input() data: any []
  @Input() city: string
  @Input() date: string
  max: number
  min: number
  weather = ""

  constructor() {
  }

  ngOnInit() {
    this.buildSVG();
   }

  ngOnChanges() {
    const svg = d3.select("#d3svg")
    svg.selectAll("*").remove();
    this.buildSVG()
   }

  buildSVG() {
    const svg = d3.select("#d3svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    const g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const data = this.data.filter(item => item.min === "00");

    this.max = d3.max(data, function(d) { return d.temp; });
    this.min = d3.min(data, function(d) { return d.temp; });
    x.domain(data.map(function(d) { return `${d.hour}h`; }));
    y.domain([this.min - 2, this.max + 2]);


    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
         .attr("class", "axis axis--y")
         .call(d3.axisLeft(y).ticks(10).tickFormat(function(d){return d + "°"}))
       .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "0.71em")
         .attr("text-anchor", "end")
         .text("Temperature");


    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(`${d.hour}h`); })
        .attr("y", function(d) { return y(d.temp); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.temp); });

    this.evalWeather()
  }

  evalWeather() {
    if(this.max >= 25 ){
      this.weather = '<h2 class="weather-result"><i class="material-icons rwarm">beach_access</i> Really warm!</h2>'
    } else if(this.max >= 15) {
      this.weather = '<h2 class="weather-result"><i class="material-icons pwarm">wb_sunny</i> Pretty warm!</h2>'
    } else if(this.max >= 5) {
      this.weather = '<h2 class="weather-result"><i class="material-icons pcold">wb_cloudy</i> Pretty cold!</h2>'
    } else {
      this.weather = '<h2 class="weather-result"><i class="material-icons rcold">ac_unit</i> Really cold!</h2>'
    }
  }
}
