import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core";
import { Observable, interval, timer } from "rxjs";
import { map } from "rxjs/operators";
import { LinearGauge } from "ng-canvas-gauges";

export class LinearUIConfig {
  colorPlate: String;
  colorMajorTicks: String;
  colorMinorTicks: String;
  colorStrokeTicks: String;
  colorTitle: String;
  colorNumbers: String;
  colorBar: String;
  colorBarProgress: String;
}

@Component({
  selector: "app-linear-gauge",
  templateUrl: "./linear-gauge.component.html",
  styleUrls: ["./linear-gauge.component.css"]
})
export class LinearGaugeComponent implements OnInit {
  @Input() linearUIConfig: LinearUIConfig;
  @Input() inputValue: number;
  @Input() dataConfig: any;

  @ViewChild("scale_gauge", { static: false })
  private linearGauge: LinearGauge;
  public scaleGaugeOptions: any;
  public value$: Observable<number>;

  majorTick: any;
  constructor() {}

  ngOnInit() {
    // const data = [];
    // const max = this.max / 10;
    // const loop = max / 50;
    // for (let i = this.min; i <= loop; i++) {
    //   data.push(i * 10);
    // }
    // this.majorTick = data;
    this.value$ = interval().pipe(map(() => this.inputValue));
    this.initOptions();
  }

  update() {
    alert("gghghghhjhj");
    this.scaleGaugeOptions = {
      title: `Madhyi  = ${200} (°C)`
    };
     this.linearGauge.update(this.scaleGaugeOptions);
  }

  private initOptions() {
    this.scaleGaugeOptions = {
      title: `Temperature  = ${this.inputValue} (°C)`,
      width: "400",
      height: "150",
      // units: "Lbs",
      minValue: this.dataConfig.min,
      maxValue: this.dataConfig.max,
      // majorTicks: this.majorTick,
      minorTicks: "5",
      // majorTicksInt: 100,
      // strokeTicks: "true",
      highlightsWidth: 0,
      highLights: "false",
      valueBox: true,
      valueInt: true,
      // exactTicks: "true",
      borders: 0,
      boxStroke: 0,
      borderMiddleWidth: 0,
      borderInnerWidth: 0,
      borderShadowWidth: 0,

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
      ticksPadding: 5,
      colorPlate: this.linearUIConfig.colorPlate,
      colorMajorTicks: this.linearUIConfig.colorMajorTicks,
      colorMinorTicks: this.linearUIConfig.colorMinorTicks,
      colorStrokeTicks: this.linearUIConfig.colorStrokeTicks,
      colorTitle: this.linearUIConfig.colorTitle,
      colorNumbers: this.linearUIConfig.colorNumbers,
      // colorValueBoxBackground: "#fff",
      colorBar: this.linearUIConfig.colorBar,
      colorBarProgress: this.linearUIConfig.colorBarProgress,
      animationTarget: "plate",
      animationRule: "linear",
      animationDuration: "1500"
    };
  }
}
