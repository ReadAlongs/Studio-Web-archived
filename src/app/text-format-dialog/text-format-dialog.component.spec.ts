import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TranslateModule } from "@ngx-translate/core";
import { TextFormatDialogComponent } from "./text-format-dialog.component";

describe("TextFormatDialogComponent", () => {
  let component: TextFormatDialogComponent;
  let fixture: ComponentFixture<TextFormatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [TextFormatDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextFormatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
