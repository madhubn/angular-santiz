import { Component, OnInit } from "@angular/core";
import { interval, Observable } from "rxjs";
import { RadialGauge } from "ng-canvas-gauges";
import { map } from "rxjs/operators";

@Component({
  selector: "app-linear-gauge",
  templateUrl: "./linear-gauge.component.html",
  styleUrls: ["./linear-gauge.component.css"]
})
export class LinearGaugeComponent implements OnInit {
  public value$: Observable<number>;

  min = 0;
  max = 100;
  majorTick = [];
  constructor() {}

  ngOnInit() {
    const max= this.max/10;
    for(let i = this.min; i<= max ; i++){
       this.majorTick.push(i * 10)
    }
    this.value$ = interval(2000).pipe(map(() => 20));
    
    console.log('this.majorTick',this.majorTick);
  }
}