import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";

import { By } from "@angular/platform-browser";

import { MaterialModule } from "../material.module";
import { DemoComponent } from "./demo.component";

//
describe("DemoComponent", () => {
  let component: DemoComponent;
  let fixture: ComponentFixture<DemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [DemoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DemoComponent);
    component = fixture.componentInstance;
    component.b64Inputs = ["true"];
    component.slots.title = "new title";
    fixture.detectChanges();
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid1"));
    title1.nativeElement.value = "new title";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("new title");
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid2"));
    title1.nativeElement.value = "new sub title";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("new sub title");
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid1"));
    title1.nativeElement.value = "";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBeNull;
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid2"));
    title1.nativeElement.value = "";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBeNull;
  });

  it("test edit title more than once", () => {
    const title1 = fixture.debugElement.query(By.css("#divid1"));
    for (let i = 1; i <= 50; i++) {
      title1.nativeElement.value = "title " + i;
    }

    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("title 50");
  });

  it("test edit sub title", () => {
    const title1 = fixture.debugElement.query(By.css("#divid2"));
    for (let i = 1; i <= 50; i++) {
      title1.nativeElement.value = "sub title " + i;
    }

    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("sub title 50");
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid1"));
    title1.nativeElement.value = "new title";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("new title");
  });

  it("test edit title", () => {
    const { debugElement } = fixture;
    const title1 = fixture.debugElement.query(By.css("#divid2"));
    title1.nativeElement.value = "new sub title";
    title1.nativeElement.dispatchEvent(new Event("input"));
    expect(title1.nativeElement.value).toBe("new sub title");
  });
});
