import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {GaugesModule} from 'ng-canvas-gauges';
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { SafePipe } from "./safe.pipe";
import { TextComponent } from './text/text.component';
import { LinearGaugeComponent } from './linear-gauge/linear-gauge.component';

@NgModule({
  imports: [BrowserModule,GaugesModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, HelloComponent, SafePipe, TextComponent, LinearGaugeComponent],
  exports: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
