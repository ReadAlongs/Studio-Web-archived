import { ToastrModule } from "ngx-toastr";

import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent, PrivacyDialog } from "./app.component";
import { ConfigComponent } from "./core/config/config.component";
import { DemoComponent } from "./core/demo/demo.component";
import { UploadComponent } from "./core/upload/upload.component";
import { MaterialModule } from "./material.module";
import { StoreModule } from "@ngrx/store";

@NgModule({
  declarations: [
    AppComponent,
    ConfigComponent,
    DemoComponent,
    UploadComponent,
    PrivacyDialog,
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
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
