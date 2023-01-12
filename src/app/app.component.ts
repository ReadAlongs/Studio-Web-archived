import { ShepherdService } from "angular-shepherd";
import { ToastrService } from "ngx-toastr";
import { forkJoin, Observable, of, Subject } from "rxjs";
import { Segment } from "soundswallower";

import { Component, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatStepper } from "@angular/material/stepper";
import { TranslateService } from "@ngx-translate/core";

import { B64Service } from "./b64.service";
import { FileService } from "./file.service";
import {
  audio_file_step,
  audio_record_step,
  data_step,
  final_step,
  intro_step,
  language_step,
  text_file_step,
  text_write_step,
} from "./shepherd.steps";
import { UploadComponent } from "./upload/upload.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"],
})
export class AppComponent {
  firstFormGroup: any;
  title = "readalong-studio";
  alignment = new Subject<string>();
  text = new Subject<string>();
  audio = new Subject<string>();
  b64Inputs$ = new Subject<string[]>();
  @ViewChild("upload", { static: false }) upload?: UploadComponent;
  @ViewChild("stepper") private stepper: MatStepper;
  constructor(
    private b64Service: B64Service,
    private fileService: FileService,
    private toastr: ToastrService,
    public translate: TranslateService,
    public dialog: MatDialog,
    public shepherdService: ShepherdService
  ) {
    translate.setDefaultLang("en");
    translate.use("en");
  }

  ngOnInit(): void {
    this.b64Inputs$.subscribe((x) => console.log(x));
    // This solution one doesn't work, the translations are not loaded yet when the warning gets displayed.
    //this.toastr.warning(
    //  this.translate.instant("app.not-released"),
    //  this.translate.instant("app.not-released-title"),
    //  { timeOut: 10000 }
    //);
    // This solution works, but you only get the English message at load time, switching language does not display the French message.
    forkJoin({
      title: this.translate.get("app.not-released-title"),
      text: this.translate.get("app.not-released"),
    }).subscribe((v) => {
      this.toastr.warning(v.text, v.title);
    });
  }

  ngAfterViewInit() {
    this.shepherdService.defaultStepOptions = {
      classes: "",
      scrollTo: true,
      cancelIcon: {
        enabled: true,
      },
    };
    text_file_step["when"] = {
      show: () => {
        if (this.upload) {
          this.upload.inputMethod.text = "upload";
        }
      },
      hide: () => {
        if (this.upload) {
          this.upload.inputMethod.text = "edit";
        }
      },
    };
    audio_file_step["when"] = {
      show: () => {
        if (this.upload) {
          this.upload.inputMethod.audio = "upload";
        }
      },
      hide: () => {
        if (this.upload) {
          this.upload.inputMethod.audio = "mic";
        }
      },
    };
    this.shepherdService.modal = true;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps([
      intro_step,
      data_step,
      text_write_step,
      text_file_step,
      audio_record_step,
      audio_file_step,
      language_step,
      final_step,
    ]);
  }

  openPrivacyDialog(): void {
    this.dialog.open(PrivacyDialog, {
      width: "250px",
    });
  }

  formChanged(formGroup: FormGroup) {
    this.firstFormGroup = formGroup;
  }

  stepChange(event: any[]) {
    if (event[0] === "aligned") {
      forkJoin([
        this.fileService.readFileAsData$(event[1]),
        of(
          `data:application/xml;base64,${this.b64Service.xmlStringToB64(
            event[2]
          )}`
        ),
        of(
          this.b64Service.alignmentToSmil(event[3] as Segment, "test", "test")
        ),
        this.b64Service.getBundle$(),
      ]).subscribe((x: any) => this.b64Inputs$.next(x));
      this.stepper.next();
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language);
    // I don't like this - it means we re-display the warning each time we change the language. But otherwise, I only display it in English and never in French. Maybe that's OK?
    // Maybe if we can save the user's language choice on their PC, the interface would be in their language up front afterwards and we wouldn't need to repeat this?
    // Maybe we can have a counter and set a maximum number of times we'll display this message? Or remember which languages we displayed it in? Meh...
    forkJoin({
      title: this.translate.get("app.not-released-title"),
      text: this.translate.get("app.not-released"),
    }).subscribe((v) => {
      this.toastr.warning(v.text, v.title);
    });
  }
}

@Component({
  selector: "privacy-dialog",
  templateUrl: "privacy-dialog.html",
})
export class PrivacyDialog {
  constructor(public dialogRef: MatDialogRef<PrivacyDialog>) {}
  ngOnInit() {
    this.dialogRef.updateSize("400px");
  }
}
