import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { SafePipe } from "./safe.pipe";
import { TextComponent } from './text/text.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, HelloComponent, SafePipe, TextComponent],
  exports: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
