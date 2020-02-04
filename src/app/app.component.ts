import { Component, SecurityContext, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  html: string;
  h_html: string;

  public form: FormGroup;
  public contactList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get("contacts") as FormArray;
  }

  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) {
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

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()])
    });

    // set contactlist to this field
    this.contactList = this.form.get("contacts") as FormArray;
  }


  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: ['email', Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // remove contact from group
  removeContact(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.contactList.removeAt(index);
  }

  // triggered to change validation of value field type
  changedFieldType(index) {
    let validators = null;

    if (this.getContactsFormGroup(index).controls["type"].value === "email") {
      validators = Validators.compose([Validators.required, Validators.email]);
    } else {
      validators = Validators.compose([
        Validators.required,
        Validators.pattern(new RegExp("^\\+[0-9]?()[0-9](\\d[0-9]{9})$")) // pattern for validating international phone number
      ]);
    }

    this.getContactsFormGroup(index).controls["value"].setValidators(
      validators
    );

    this.getContactsFormGroup(index).controls["value"].updateValueAndValidity();
  }

  // get the formgroup under contacts form array
  getContactsFormGroup(index): FormGroup {
    // this.contactList = this.form.get('contacts') as FormArray;
    const formGroup = this.contactList.controls[index] as FormGroup;
    return formGroup;
  }

  // method triggered when form is submitted
  submit() {
    console.log(this.form.value);
  }
}
