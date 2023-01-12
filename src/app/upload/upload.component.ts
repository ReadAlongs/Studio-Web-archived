// -*- typescript-indent-level: 2 -*-
import { ToastrService } from "ngx-toastr";
import { Observable, forkJoin, of, zip } from "rxjs";
import { map, switchMap, take } from "rxjs/operators";

import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ProgressBarMode } from "@angular/material/progress-bar";

import { AudioService } from "../audio.service";
import { FileService } from "../file.service";
import { MicrophoneService } from "../microphone.service";
import {
  RasService,
  ReadAlong,
  ReadAlongRequest,
  LanguageMap,
} from "../ras.service";
import {
  SoundswallowerService,
  AlignmentProgress,
} from "../soundswallower.service";
import { TextFormatDialogComponent } from "../text-format-dialog/text-format-dialog.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.sass"],
})
export class UploadComponent implements OnInit {
  langs$ = this.rasService.getLangs$().pipe(
    map((langs: LanguageMap) =>
      Object.entries(langs).map(([lang_code, lang_name]) => {
        return { id: lang_code, name: lang_name };
      })
    )
  );
  loading = false;
  langControl = new FormControl<string>("und", Validators.required);
  textControl = new FormControl<any>(null, Validators.required);
  audioControl = new FormControl<File | Blob | null>(null, Validators.required);
  recording = false;
  playing = false;
  progressMode: ProgressBarMode = "indeterminate";
  progressValue = 0;

  @Output() stepChange = new EventEmitter<any[]>();
  public uploadFormGroup = this._formBuilder.group({
    lang: this.langControl,
    text: this.textControl,
    audio: this.audioControl,
  });
  inputMethod = {
    audio: "mic",
    text: "edit",
  };
  textInput: any;
  constructor(
    private _formBuilder: FormBuilder,
    private toastr: ToastrService,
    private rasService: RasService,
    private fileService: FileService,
    private audioService: AudioService,
    private ssjsService: SoundswallowerService,
    private microphoneService: MicrophoneService,
    private dialog: MatDialog,
    private translate: TranslateService
  ) {
    this.microphoneService.recorderError.subscribe((recorderErrorCase) => {
      this.toastr.error(
        recorderErrorCase.toString(),
        this.translate.instant("upload.errors.recording-error")
      );
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.ssjsService.initialize();
    } catch (err) {
      console.log(err);
    }
  }

  downloadRecording() {
    if (this.audioControl.value !== null) {
      let blob = new Blob([this.audioControl.value], {
        type: "audio/webm",
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "ras-audio-" + Date.now() + ".webm";
      a.click();
      a.remove();
    } else {
      this.toastr.error(
        this.translate.instant("upload.errors.no-audio-download"),
        this.translate.instant("upload.errors.sorry")
      );
    }
  }

  downloadText() {
    if (this.textInput) {
      let textBlob = new Blob([this.textInput], {
        type: "text/plain",
      });
      var url = window.URL.createObjectURL(textBlob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "ras-text-" + Date.now() + ".txt";
      a.click();
      a.remove();
    } else {
      this.toastr.error(
        this.translate.instant("upload.errors.no-text-download"),
        this.translate.instant("upload.errors.sorry")
      );
    }
  }

  displayFormatHelp(): void {
    this.dialog.open(TextFormatDialogComponent);
  }

  handleTextInput(event: any) {
    this.textInput = event.target.value;
  }

  startRecording() {
    this.recording = true;
    this.microphoneService.startRecording();
  }

  pauseRecording() {
    this.recording = false;
    this.microphoneService.pause();
  }

  resumeRecording() {
    this.recording = true;
    this.microphoneService.resume();
  }

  playRecording() {
    if (!this.playing && this.audioControl.value !== null) {
      let player = new window.Audio();
      player.src = URL.createObjectURL(this.audioControl.value);
      player.onended = () => {
        this.playing = false;
      };
      player.load();
      this.playing = true;
      player.play();
    }
  }

  deleteRecording() {
    this.audioControl.setValue(null);
  }

  stopRecording() {
    this.recording = false;
    this.microphoneService
      .stopRecording()
      .then((output) => {
        this.toastr.success(
          this.translate.instant("upload.record.success"),
          this.translate.instant("upload.record.success-title")
        );
        this.audioControl.setValue(output as Blob);
        // do post output steps
      })
      .catch((errorCase) => {
        this.toastr.error(
          this.translate.instant("upload.record.try-again"),
          this.translate.instant("upload.record.try-again-title")
        );
        console.log(errorCase);
        // Handle Error
      });
  }

  toggleAudioInput(event: any) {
    this.inputMethod.audio = event.value;
  }

  toggleTextInput(event: any) {
    this.inputMethod.text = event.value;
  }

  nextStep() {
    if (this.inputMethod.text === "edit") {
      if (this.textInput) {
        let inputText = new Blob([this.textInput], {
          type: "text/plain",
        });
        this.textControl.setValue(inputText);
      } else {
        this.toastr.error(
          this.translate.instant("upload.errors.no-text"),
          this.translate.instant("upload.errors.no-text-title"),
          { timeOut: 15000 }
        );
      }
    } else {
      if (this.textControl.value === null) {
        this.toastr.error(
          this.translate.instant("upload.errors.no-text-file"),
          this.translate.instant("upload.errors.no-text-file-title"),
          { timeOut: 15000 }
        );
      }
    }
    if (this.uploadFormGroup.valid && this.audioControl.value !== null) {
      // Show progress bar
      this.loading = true;
      this.progressMode = "query";
      // Determine text type for API request
      const text_is_xml =
        this.inputMethod.text === "upload" &&
        (this.textControl.value.name.toLowerCase().endsWith(".xml") ||
          this.textControl.value.name.toLowerCase().endsWith(".ras"));
      // Create request (have to set text later...)
      let body: ReadAlongRequest = {
        text_languages: [this.langControl.value as string, "und"],
      };
      forkJoin({
        audio: this.audioService.loadAudioBufferFromFile$(
          this.audioControl.value as File,
          8000
        ),
        ras: this.fileService.readFile$(this.textControl.value).pipe(
          // WTF RxJS, why does the type get lost here?!?!?!?!
          // See https://stackoverflow.com/questions/66615681/rxjs-switchmap-mergemap-resulting-in-obserableunknown
          switchMap((text: string): Observable<ReadAlong> => {
            if (text_is_xml) body.xml = text;
            else body.text = text;
            this.progressMode = "determinate";
            this.progressValue = 0;
            return this.rasService.assembleReadalong$(body);
          })
        ),
      })
        .pipe(
          switchMap(({ audio, ras }) =>
            // FIXME: see WTF above
            this.ssjsService.align$(audio, ras as ReadAlong)
          )
        )
        .subscribe((progress) => {
          if (progress.pos == progress.length) {
            this.loading = false;
            this.stepChange.emit([
              "aligned",
              this.audioControl.value,
              progress.xml,
              progress.hypseg,
            ]);
          } else {
            this.progressValue = Math.round(
              (progress.pos / progress.length) * 100
            );
          }
        });
    } else {
      if (this.langControl.value === null) {
        this.toastr.error(
          this.translate.instant("upload.errors.no-lang"),
          this.translate.instant("upload.errors.no-lang-title"),
          { timeOut: 15000 }
        );
      }
      if (this.audioControl.value === null) {
        this.toastr.error(
          this.translate.instant("upload.errors.no-audio"),
          this.translate.instant("upload.errors.no-audio-title"),
          { timeOut: 15000 }
        );
      }
      this.toastr.error(
        this.translate.instant("upload.errors.form-incomplete"),
        this.translate.instant("upload.errors.form-incomplete-title"),
        { timeOut: 15000 }
      );
    }
  }

  onFileSelected(type: any, event: any) {
    const file: File = event.target.files[0];
    if (type === "audio") {
      if (file.type == "video/webm") {
        // No, it is audio, because we say so.
        const audioFile = new File([file], file.name, { type: "audio/webm" });
        this.audioControl.setValue(audioFile);
      } else {
        this.audioControl.setValue(file);
      }
      this.toastr.success(
        this.translate.instant("upload.file") +
          file.name +
          this.translate.instant("upload.audio.success"),
        this.translate.instant("upload.great"),
        { timeOut: 10000 }
      );
    } else if (type === "text") {
      this.textControl.setValue(file);
      this.toastr.success(
        this.translate.instant("upload.file") +
          file.name +
          this.translate.instant("upload.text-box.success"),
        this.translate.instant("upload.great"),
        { timeOut: 10000 }
      );
    }
  }
}
