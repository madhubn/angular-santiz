import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Observable, interval, timer } from "rxjs";
import { map } from "rxjs/operators";
import { RadialGauge } from "ng-canvas-gauges";

/**
 * A simple scale gauge for measuring 0-10 lbs.
 * Demonstrates dynamic configuration and update of
 * gauge properties.
 */
@Component({
  selector: "app-radial-gauge",
  templateUrl: "./radial-gauge.component.html",
  styleUrls: ["./radial-gauge.component.css"]
})
export class RadialGaugeComponent implements OnInit, AfterViewInit {
  @ViewChild("scale_gauge", { static: false })
  private radialGauge: RadialGauge;
  @ViewChild("scale_gauge_semi", { static: false })
  private radialGaugeSemi: RadialGauge;
  @ViewChild("scale_gauge_arc", { static: false })
  private radialGaugeArc: RadialGauge;

  mins = 0;
  maxs = 100;

  public scaleGaugeOptions: any;
  public scaleGaugeOptionsSemi: any;
  public scaleGaugeOptionsArc: any;
  public value$: Observable<number>;

  private plateColor = {
    min: 50,
    max: 250,
    current: 150,
    increasing: true
  };

  constructor() {
    this.initOptions();
  }

  ngOnInit() {
    this.value$ = interval(2000).pipe(map(() => Math.random() * 10));
  }

  ngAfterViewInit() {
    // this.radialGauge.update(this.scaleGaugeOptions);
    // this.radialGaugeSemi.update(this.scaleGaugeOptionsSemi);
    // this.radialGaugeArc.update(this.scaleGaugeOptionsArc);
    // timer that updates plate.color property
    // interval(100).subscribe( t => this.updateCoverPlateColor() );
  }

  // Update the cover.plate red property and update scaleGaugeOptions
  // Incrementally increases color.plate red color value up to max.
  // Then decrease color.plate red color down to min.
  private updateCoverPlateColor() {
    this.plateColor.current += this.plateColor.increasing ? 2 : -2;

    const color = `"rgb(250,${this.plateColor.current},50)"`;

    this.scaleGaugeOptions = { colorPlate: color };

    if (
      this.plateColor.increasing &&
      this.plateColor.current >= this.plateColor.max
    ) {
      this.plateColor.increasing = false;
    } else if (
      !this.plateColor.increasing &&
      this.plateColor.current <= this.plateColor.min
    ) {
      this.plateColor.increasing = true;
    }
  }

  private initOptions() {
    this.scaleGaugeOptions = {
      title: "",
      width: "250",
      height: "250",
      // majorTicks: "[0,1,2,3,4,5,6,7,8,9,0]",
      units: "Lbs",
      minValue: this.mins,
      maxValue: this.maxs,
      minorTicks: "2",
      strokeTicks: "true",
      ticksAngle: "360",
      startAngle: "180",
      valueBox: "true",
      animationRule: "bounce",
      animationDuration: "500",
      colorPlate: "black",
      highlights: "[]",
      colorMajorTicks: "#fff",
      colorMinorTicks: "#fff",
      colorStrokeTicks: "#fff",
      colorTitle: "#fff",
      colorNumbers: "#fff"
    };
    this.scaleGaugeOptionsSemi = {
      title: "",
      width: "250",
      height: "250",
      // majorTicks: "[-50,-40,-30,-20,-10,0,10,20,30,40,50]",
      units: "°C",
      minValue: -50,
      maxValue: 50,
      minorTicks: "2",
      strokeTicks: "true",
      ticksAngle: 180,
      startAngle: 90,
      valueBox: "true",
      animationRule: "bounce",
      animationDuration: "500",
      colorPlate: "black",
      // colorPlateEnd: "#fff",
      // colorPlateEnd: "red",
      // highlightsWidth: 13,
      highlights: [
        { from: -50, to: 0, color: "rgba(0,0, 255, .3)" },
        { from: 0, to: 50, color: "rgba(255, 0, 0, .3)" }
      ],
      colorMajorTicks: "#fff",
      colorMinorTicks: "#fff",
      colorStrokeTicks: "#fff",
      colorTitle: "#fff",
      colorNumbers: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      colorBorderOuter: "#333",
      colorBorderOuterEnd: "#111",
      colorBorderMiddle: "#222",
      colorBorderMiddleEnd: "#111",
      colorBorderInner: "#111",
      colorBorderInnerEnd: "#333",
      colorNeedleShadowDown: "#333",
      colorNeedleCircleOuter: "#333",
      colorNeedleCircleOuterEnd: "#111",
      colorNeedleCircleInner: "#111",
      colorNeedleCircleInnerEnd: "#222",
      colorValueBoxRect: "#222",
      valueBoxBorderRadius: 0,
      colorValueBoxRectEnd: "#333",
      fontValue: "led",
      fontNumbers: "led",
      fontTitle: "led",
      fontUnits: "led",
      animationTarget: "needle",
      colorBorderShadow: "red",
      colorValueBoxBackground: "red"
      // colorNeedleCircleOuter: "true",
    };

    this.scaleGaugeOptionsArc = {
      title: "",
      width: "250",
      height: "250",
      // majorTicks: "[-50,-40,-30,-20,-10,0,10,20,30,40,50]",
      units: "°C",
      minValue: 0,
      maxValue: 220,
      minorTicks: "2",
      strokeTicks: "true",
      valueBox: "true",
      animationRule: "bounce",
      animationDuration: "500",
      colorPlate: "transparent",
      // colorPlateEnd: "#fff",
      // colorPlateEnd: "red",
      // highlightsWidth: 0,
      highlights: [
        { from: 0, to: 50, color: "rgba(0,255,0,.15)" },
        { from: 50, to: 100, color: "rgba(255,255,0,.15)" },
        { from: 100, to: 150, color: "rgba(255,30,0,.25)" },
        { from: 150, to: 200, color: "rgba(255,0,225,.25)" },
        { from: 200, to: 220, color: "rgba(0,0,255,.25)" }
      ],
      colorMajorTicks: "#fff",
      colorMinorTicks: "#fff",
      colorStrokeTicks: "#fff",
      colorTitle: "#fff",
      colorNumbers: "#fff",
      borderShadowWidth: 0,
      borders: false,
      needleType: "arrow",
      needleWidth: 2,
      needleCircleSize: 7,
      colorBorderOuter: "#333",
      colorBorderOuterEnd: "#111",
      colorBorderMiddle: "#222",
      colorBorderMiddleEnd: "#111",
      colorBorderInner: "#111",
      colorBorderInnerEnd: "#333",
      colorNeedleShadowDown: "#333",
      colorNeedleCircleOuter: "#333",
      colorNeedleCircleOuterEnd: "#111",
      colorNeedleCircleInner: "#111",
      colorNeedleCircleInnerEnd: "#222",
      colorValueBoxRect: "#222",
      valueBoxBorderRadius: 0,
      colorValueBoxRectEnd: "#333",
      fontValue: "led",
      fontNumbers: "led",
      fontTitle: "led",
      fontUnits: "led",
      animationTarget: "needle",
      colorBorderShadow: "red"
      // colorValueBoxBackground: "red",
      // colorNeedleCircleOuter: "true",
    };
  }
}
