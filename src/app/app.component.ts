import { Component, SecurityContext, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DeviceDetectorService } from "ngx-device-detector";

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
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular";
  html: string;
  h_html: string;

  linearUIConfig: LinearUIConfig = new LinearUIConfig();

  public form: FormGroup;
  public contactList: FormArray;
  public staticList: FormArray;
  public uiConfigList: FormArray;
  public dynamicElementList: FormArray;

  // returns all form groups under contacts
  get contactFormGroup() {
    return this.form.get("contacts") as FormArray;
  }

  // returns all form groups under contacts
  get staticFormGroup() {  
    return this.form.get("statics") as FormArray;
  }

  // returns all form groups under contacts
  get uiConfigFormGroup() {
    return this.form.get("uiConfig") as FormArray;
  }

  /*############### Add Dynamic Elements ###############*/
  get addDynamicElement() {
    return this.form.get("uiConfig") as FormArray;
  }

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService
  ) {
    this.html = '<svg onload="alert(1)"> blah </svg>';
    this.h_html = sanitizer.sanitize(
      SecurityContext.HTML,
      '<svg onload="alert(2)"> blah </svg>'
    );
    this.epicFunction();
    this.linearUIConfig.colorBar = "red";
    this.linearUIConfig.colorBarProgress = "green";
    this.linearUIConfig.colorMajorTicks = "#fff";
    this.linearUIConfig.colorMinorTicks = "#fff";
    this.linearUIConfig.colorNumbers = "#fff";
    this.linearUIConfig.colorPlate = "black";
    this.linearUIConfig.colorStrokeTicks = "#fff";
    this.linearUIConfig.colorTitle = "#fff";
    console.log(new Date().getTime())
  }

  onChange(data: any) {
    console.log("data", data);
    this.h_html = this.sanitizer.sanitize(SecurityContext.HTML, data);
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      organization: [null],
      contacts: this.fb.array([this.createContact()]),
      statics: this.fb.array([]),
      uiConfig: this.fb.array([this.createUiConfig])
    });

    // set contactlist to this field
    this.contactList = this.form.get("contacts") as FormArray;
    this.staticList = this.form.get("statics") as FormArray;
    this.uiConfigList = this.form.get("uiConfig") as FormArray;
  }

  // contact formgroup
  createContact(): FormGroup {
    return this.fb.group({
      type: ["email", Validators.compose([Validators.required])], // i.e Email, Phone
      name: [null, Validators.compose([Validators.required])], // i.e. Home, Office
      value: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }
  // contact formgroup
  createUiConfig(): FormGroup {
    return this.fb.group({
      addDynamicElement: this.fb.array([]) // i.e. Home, Office
    });
    // this.dynamicElementList = this.form.get("addDynamicElement") as FormArray;
  }

  addItems() {
    this.addDynamicElement.push(this.fb.control(""));
  }

  // contact formgroup
  createStatics(): FormGroup {
    return this.fb.group({
      staticData: [null, Validators.compose([Validators.required])] // i.e. Home, Office
    });
  }

  // add a contact form group
  addUiConfig() {
    this.uiConfigList.push(this.createUiConfig());
  }

  // add a contact form group
  addContact() {
    this.contactList.push(this.createContact());
  }

  // add a contact form group
  addStaticData() {
    this.staticList.push(this.createStatics());
  }

  // remove contact from group
  removeContact(index) {
    this.contactList.removeAt(this.contactList.length - 1);
    // this.contactList.removeAt(index);
  }

  // remove contact from group
  removeStatic(index) {
    // this.contactList = this.form.get('contacts') as FormArray;
    this.staticList.removeAt(index);
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
deviceInfo = null;

  epicFunction() {
      console.log('hello `Home` component');
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isMobile = this.deviceService.isMobile();
      const isTablet = this.deviceService.isTablet();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(this.deviceInfo);
      console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
      console.log(isTablet);  // returns if the device us a tablet (iPad etc)
      console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    }
}
