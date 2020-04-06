import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
@Component({
  selector: "app-text",
  templateUrl: "./text.component.html",
  styleUrls: ["./text.component.css"]
})
export class TextComponent {
  newFormGroup: FormGroup;
  expression: any;

  constructor(public fb: FormBuilder) {
    this.addItems();
    this.craeteForm();
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

  craeteForm() {
    this.newFormGroup = this.fb.group({
      expression: ["", Validators.required]
    });
  }
}
