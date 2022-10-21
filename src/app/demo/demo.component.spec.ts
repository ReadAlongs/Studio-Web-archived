import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
// add By to query 
import { By } from '@angular/platform-browser'

import { MaterialModule } from "../material.module";
import { DemoComponent } from "./demo.component";

// ==== check create or not and defalut value ===== 
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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Title'`, () => {
    expect(component.slots.title).toEqual("Title");
  });

  it(`should have as subtitle 'SubTitle'`, () => {
    expect(component.slots.subtitle).toEqual("Subtitle");
  });

  it(`should have as page title 'ReadAlong Studio'`, () => {
    expect(component.getTitle()).toEqual("ReadAlong Studio");
  });

});

// ================test page title=================
// === test editable test page before edited ===
describe("DemoComponent-pagetitle-defalutvalue", () => {
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
    fixture.detectChanges();
  });

  it("test editable defalut page title ", () => {
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#spanid')).nativeElement;
     expect(title1.textContent).toContain('ReadAlong Studio');
  });
});

// === test editable test page after edited ===
describe("DemoComponent-pagetitle-edittvalue", () => {
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
    component.setTitle("new editable Page");
    fixture.detectChanges();

  });

  it("test editable page title after edit ", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid')).nativeElement;
    expect(title1.textContent).toContain('new editable Page');
 });
});


// === test editable test page after edited empty value ===
describe("DemoComponent-pagetitle-editempty", () => {
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
    component.setTitle("");
    fixture.detectChanges();

  });

  it("test editable page title after edit ", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid')).nativeElement;
    expect(title1.textContent).toBeNull;
 });
});

// === test editable test page after twice edited ====
describe("DemoComponent-pagetitle-edittwice", () => {
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
    component.setTitle("new editable Page");
    component.setTitle("new editable Page 2");
    fixture.detectChanges();

  });

  it("test editable page title after twice edit ", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid')).nativeElement;
    expect(title1.textContent).toContain('new editable Page 2');
 });
});
