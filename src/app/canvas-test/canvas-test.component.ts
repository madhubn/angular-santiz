import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from "@angular/core";
import { Square } from "./square";
import * as d3 from "d3";
import * as d3Scale from "d3";
import * as d3Shape from "d3";
import * as d3Array from "d3";
import * as d3Axis from "d3";

// https://github.com/datencia/d3js-angular-examples/blob/master/src/app/01_line_chart/line-chart.component.ts
@Component({
  selector: "app-canvas-test",
  templateUrl: "./canvas-test.component.html",
  styleUrls: ["./canvas-test.component.css"]
})
export class CanvasTestComponent implements OnInit {
  public title = "Line Chart";
  data: any[] = [
    { date: new Date("2010-01-01"), value: 0.04, value1: 12773.0 },
    { date: new Date("2010-01-04"), value: 0.08, value1: 13200.0 },
    { date: new Date("2010-01-05"), value: 0.16, value1: 13315 },
    { date: new Date("2010-01-06"), value: 0.25, value1: 13228 },
    { date: new Date("2010-01-07"), value: 0.33, value1: 13114 },
    { date: new Date("2010-01-08"), value: 0.58, value1: 12985 },
    { date: new Date("2010-01-09"), value: 0.83, value1: 12896 },
    { date: new Date("2010-01-10"), value: 1.08, value1: 12862 },
    { date: new Date("2010-01-11"), value: 1.33, value1: 12875 }
  ];

  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>; // this is line defination

  constructor() {
    // configure margins and width/height of the graph
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }
  public ngOnInit(): void {
    this.buildSvg();
    this.addXandYAxis();
    this.drawLineAndPath();
  }

  private buildSvg() {
    this.svg = d3
      .select("svg")
      .append("g")
      .attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
  }
  private addXandYAxis() {
    // range of data configuring
    // this.x = d3Scale.scaleTime().range([0, this.width]);
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    // this.x.domain(d3Array.extent(this.data, d => d.date));
    this.y.domain(d3Array.extent(this.data, d => d.value1));
    this.x.domain(d3Array.extent(this.data, d => d.value));
    // Configure the X Axis
    this.svg
      .append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3Axis.axisBottom(this.x));
    // Configure the Y Axis
    this.svg
      .append("g")
      .attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y));
  }

  private drawLineAndPath() {
    this.line = d3Shape
      .line()
      // .x((d: any) => this.x(d.date))
      .x((d: any) => this.x(d.value))
      .y((d: any) => this.y(d.value1));
    // Configuring line path
    this.svg
      .append("path")
      .datum(this.data)
      .attr("class", "line")
      .attr("d", this.line);
  }
}
