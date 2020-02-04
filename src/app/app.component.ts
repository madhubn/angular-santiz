import { Component, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  name = "Angular";
  html: string;
  h_html: string;

  constructor(private sanitizer: DomSanitizer) {
    this.html = '<svg onload="alert(1)"> blah </svg>';
    this.h_html = sanitizer.sanitize(
      SecurityContext.HTML,
      '<svg onload="alert(2)"> blah </svg>'
    );
  }

  onChange(data: any) {
    console.log("data", data);
    this.h_html = this.sanitizer.sanitize(SecurityContext.HTML, data);
  }
}
