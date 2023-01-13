import { Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.sass"],
})
export class DemoComponent implements OnInit {
  @Input() b64Inputs: string[];

  //slots: any = { title: $localize`Title`, subtitle: $localize`Subtitle` };
  slots: any; // = {
  //  title: this.translate.get("demo.title-slot"),
  //  subtitle: this.translate.get("demo.subtitle-slot"),
  //}
  constructor(public translate: TranslateService) {}

  ngOnInit(): void {
    // This does not quite work - if the user changes the language, the displayed slot values are not updated.
    // It works fine if the user changes the language in step 1, but not if they change the language again in step 2
    forkJoin({
      title: this.translate.get("demo.title-slot"),
      subtitle: this.translate.get("demo.subtitle-slot"),
    }).subscribe((v) => (this.slots = v));
  }

  download() {
    console.log(this.slots);
    var element = document.createElement("a");
    let blob = new Blob(
      [
        `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0">
      <title>Test ReadAlong</title>
      <link rel="stylesheet" href="${this.b64Inputs[3][1]}">
      <script src="${this.b64Inputs[3][0]}"></script>
    </head>
    <body>
        <read-along text="${this.b64Inputs[1]}" alignment="${this.b64Inputs[2]}" audio="${this.b64Inputs[0]}" use-assets-folder="false">
        <span slot="read-along-header">${this.slots.title}</span>
        <span slot="read-along-subheader">${this.slots.subtitle}</span>
        </read-along>
    </body>
    </html>`,
      ],
      { type: "text/html;charset=utf-8" }
    );
    element.href = window.URL.createObjectURL(blob);
    element.download = "readalong.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
