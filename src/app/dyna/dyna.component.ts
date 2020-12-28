import { Component, OnInit } from "@angular/core";
import * as d3 from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { dataD } from "./dyna";

@Component({
  selector: "app-dyna",
  templateUrl: "./dyna.component.html",
  styleUrls: ["./dyna.component.css"]
})
export class DynaComponent implements OnInit {
  title = "Multi-Series Dyna";

  data = dataD;

  svg: any;
  margin = { top: 20, right: 80, bottom: 30, left: 50 };
  g: any;
  width: number;
  height: number;
  x;
  y;
  z;
  line;

  constructor() {}

  ngOnInit() {
    this.initChart();
    this.drawAxis();
    this.drawPath();
  }

  private initChart(): void {
    this.svg = d3.select("svg");

    this.width = this.svg.attr("width") - this.margin.left - this.margin.right;
    this.height =
      this.svg.attr("height") - this.margin.top - this.margin.bottom;

    this.g = this.svg
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );

    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

    this.line = d3Shape
      .line()
      .curve(d3Shape.curveBasis)
      .x((d: any) => this.x(d[0]))
      .y((d: any) => this.y(d[1]));

    this.x.domain(d3Array.extent(this.data, d => d[0]));

    this.y.domain([
      d3Array.min(this.data, function(c) {
        console.log("c", c);
        return c[1];
      }),
      d3Array.max(this.data, function(c) {
        console.log("c max", c);
        return c[1];
      })
    ]);

    this.z.domain("heloo");
  }

  private drawAxis(): void {
    this.g
      .append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));

    this.g
      .append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Temperature, ยบF");
  }

  private drawPath(): void {
    let city = this.g
      .selectAll(".city")
      .data(this.data)
      .enter()
      .append("g")
      .attr("class", "city");

    city
      .append("path")
      .attr("class", "line")
      .attr("d", d => this.line(this.data))
      .style("stroke", this.z());

    city
      .append("text")
      .datum(function(d) {
        // return { id: "hello", value: this.data[this.data.length - 1] };
      })
      // .attr("transform", d => {
      //   // console.log("ddddddd");
      //   // "translate(" + this.x(d.date) + "," + this.y(d.value) + ")";
      // })
      .attr("x", 3)
      .attr("dy", "0.35em")
      .style("font", "10px sans-serif");
    // .text(function(d) {
    //   return d.id;
    // });
  }
}
