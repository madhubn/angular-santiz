import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Observable, interval, timer } from "rxjs";
import { map } from "rxjs/operators";
import { LinearGauge } from "ng-canvas-gauges";

@Component({
  selector: "app-linear-gauge",
  templateUrl: "./linear-gauge.component.html",
  styleUrls: ["./linear-gauge.component.css"]
})
export class LinearGaugeComponent implements OnInit {
  public value$: Observable<number>;

  @ViewChild("scale_gauge", { static: false })
  private radialGauge: LinearGauge;
  public scaleGaugeOptions: any;
  min = 0;
  max = 220;
  majorTick: any;
  constructor() {}

  ngOnInit() {
    const data = [];
    const max = this.max / 10;
    const loop = max/2;
    for (let i = this.min; i <= loop; i++) {
      data.push(i * 20);
    }
    this.majorTick = data;
    this.value$ = interval(2000).pipe(map(() => 20));

    console.log("this.majorTick", this.majorTick);
    this.initOptions();
  }

  private initOptions() {
    this.scaleGaugeOptions = {
      title: "Temperature (°C) ",

      width: "400",
      height: "150",
      // units: "Lbs",
      minValue: 0,
      maxValue: 220,
      majorTicks: this.majorTick,
      minorTicks: "5",
      // majorTicksInt: 100,
      // strokeTicks: "true",
      highlightsWidth:0,
      highLights:"false",
      exactTicks: "true",
      borders: 0,
      boxStroke: 0,
      borderMiddleWidth:0,
      borderInnerWidth:0,
      borderShadowWidth:0,
      colorValueBoxBackground:false,
      colorPlate: "black",
      barBeginCircle: 0,
      barWidth: 10,
      tickSide: "left",
      numberSide: "left",
      needleSide: "left",
      needleType: "arrow",
      needleWidth: "20",
      colorNeedle: "blue",
      colorNeedleEnd: "rgba(255, 160, 122, .9)",
      ticksWidth: 20,
      fontNumbersSize: 20,
      ticksWidthMinor: 10,
      ticksPadding:5,
      colorMajorTicks: "#fff",
      colorMinorTicks: "#fff",
      colorStrokeTicks: "#fff",
      colorTitle: "#fff",
      colorNumbers: "#fff",
      colorBar: "red",
      colorBarProgress: "green",
      animationTarget: "plate",
      animationRule: "linear",
      animationDuration: "1500"
    };
  }
}
