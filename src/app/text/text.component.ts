import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormArray, Validators } from "@angular/forms";
@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.css"]
})
export class TextComponent {
  constructor(public fb: FormBuilder) {
    this.addItems();
  }

  /*################ Registration Form ################*/
  registrationForm = this.fb.group({
    addDynamicElement: this.fb.array([])
  });

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.registrationForm.get("addDynamicElement") as FormArray;
  }

  addItems() {
    for (let i = 0; i <= 5; i++) {
      this.addDynamicElement.push(this.fb.control(""));
    }
  }

  removeIt() {
    for (let i = 0; i <= 5; i++) {
      this.addDynamicElement.removeAt(this.addDynamicElement.length - 1);
    }
  }

  // Submit Registration Form
  onSubmit() {
    this.removeIt();
    alert(JSON.stringify(this.registrationForm.get("addDynamicElement").value));
  }
}
