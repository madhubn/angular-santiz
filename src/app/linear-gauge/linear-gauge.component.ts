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
  constructor() {
    this.initOptions();
  }

  ngOnInit() {
    // const data = [];
    // const max = this.max / 10;
    // for (let i = this.min; i <= max; i++) {
    //   data.push(i * 10);
    // }
    // this.majorTick = data;
    this.value$ = interval(2000).pipe(map(() => 20));

    console.log("this.majorTick", this.majorTick);
  }

  private initOptions() {
    this.scaleGaugeOptions = {
      title: "Temperature (°C)",
      width: "400",
      height: "150",
      units: "Lbs",
      minValue: 0,
      maxValue: 220,
      majorTicks: "0,20,40,60,80,100,120,140,160,180,200,220",
      minorTicks: "2",
      // strokeTicks: "true",
      // highLights: "false",
      // borders: "false",
      colorPlate: "black",
      // borderShadowWidth: 0,
      // barBeginCircle: "false",
      // barWidth: 10,
      tickSide: "left",
      // numberSide: "left",
      // needleSide: "left",
      // ticksWidth: 20,
      // fontNumbersSize:20,
      // ticksWidthMinor: 20,
      colorMajorTicks: "red",
      colorMinorTicks: "red",
      colorStrokeTicks: "red",
      colorTitle: "red",
      colorNumbers: "red",
      colorBar: "red",
      animationRule: "linear",
      animationDuration: "500"
    };
  }
}
