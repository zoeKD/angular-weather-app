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

@Component({
  selector: 'app-weather-result',
  templateUrl: './weather-result.component.html',
  styleUrls: ['./weather-result.component.css']
})
export class WeatherResultComponent implements OnInit {
  @Input() data: any []
  @Input() city: String
  @Input() date: String

  constructor() {
  }

  ngOnInit() {
    this.buildSVG()
   }

  ngOnChanges() {
    var svg = d3.select("svg")
    svg.selectAll("*").remove();
    this.buildSVG()
   }

  buildSVG() {
        var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var data = this.data.filter(item => item.min === "00")

      x.domain(data.map(function(d) { return `${d.hour}h`; }));
      y.domain([d3.min(data, function(d) { return d.temp; })-2, d3.max(data, function(d) { return d.temp; })+2]);


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
  }
}
