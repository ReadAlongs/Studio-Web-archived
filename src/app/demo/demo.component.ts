import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-demo",
  templateUrl: "./demo.component.html",
  styleUrls: ["./demo.component.sass"],
})
export class DemoComponent implements OnInit {
  @Input() b64Inputs: string[];

  slots: any = { title: "Title", subtitle: "Subtitle" };

  constructor() {}

  ngOnInit(): void {}

  imgBase64: any = null;

  public picked(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.handleInputChange(file); //turn into base64
    } else {
      alert("No file selected");
    }
  }

  handleInputChange(files: any) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert("invalid format");
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e: any) {
    let reader = e.target;
    console.log("_handleReaderLoaded:");
    console.log(reader.result);

    const base64result = reader.result.substr(reader.result.indexOf(",") + 1);
    console.log(base64result);

    this.imgBase64 = base64result;
  }

  async getBase64(event: any) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let imgUrl = null;
    // reader.onload = function () {
    //   //me.modelvalue = reader.result;
    //   console.log(reader.result);
    //   imgUrl = reader.result;
    // };

    // this.imgBase64 = await reader.result;
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  download() {
    console.log(this.b64Inputs);
    console.log(this.slots);
    console.log("image b64: ");
    console.log(this.imgBase64);
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
        <img src="${"data:image/jpg;base64," + this.imgBase64}" alt="img1" />
        <read-along text="${this.b64Inputs[1]}" alignment="${
          this.b64Inputs[2]
        }" audio="${this.b64Inputs[0]}" use-assets-folder="false">
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
