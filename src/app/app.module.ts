import { ToastrModule } from "ngx-toastr";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from "@angular/material/toolbar";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, PrivacyDialog } from "./app.component";
import { ConfigComponent } from "./config/config.component";
import { DemoComponent } from "./demo/demo.component";
import { MaterialModule } from "./material.module";
import { UploadComponent } from "./upload/upload.component";
import { TextFormatDialogComponent } from "./text-format-dialog/text-format-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DemoComponent,
    UploadComponent,
    PrivacyDialog,
    TextFormatDialogComponent,
    // ShepherdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    MatToolbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
