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

// === test editable test page more than once ====
describe("DemoComponent-pagetitle-editmutiplytime", () => {
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
    for(let i = 1; i <=50 ; i++ ){
      component.setTitle("new editable Page " + i);
    }

    fixture.detectChanges();

  });

  it("test editable page title more than once", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid')).nativeElement;
    expect(title1.textContent).toContain('new editable Page 50');
 });
});

// ================test title and subtitle=================
// ==== test the element(titile and subtitle) is hidden ====
// check *ngIf is not visable 
describe("DemoComponent-element-hidden", () => {
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

  it("test ifng closed", () => {
     
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#divid'));
     expect(title1).toBeNull;
    //  console.log("======test=====");
    //  console.log(title1);
  });
});
 
// ==== test the element is not hidden and defalut value ====
// * ngif visiable
describe("DemoComponent-title-subtitle-defalut", () => {
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
  });

  it("test deflaut Title", () => {
     component.b64Inputs = ["true"]
     fixture.detectChanges();
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#spanid1')).nativeElement;
     expect(title1.textContent).toContain('Title');
  });

  it("test deflaut subTitle", () => {
    component.b64Inputs = ["true"]
    fixture.detectChanges();
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid2')).nativeElement;
    expect(title1.textContent).toContain('Subtitle');
 });
});


// ==== test the element is not hidden and edit value ====
// * ngif visiable
describe("DemoComponent-title-subtitle-edit", () => {
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
    component.slots.subtitle = "new sub title";

    fixture.detectChanges();

  });

  it("test edit title", () => {
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#spanid1')).nativeElement;
     expect(component.slots.title).toEqual('new title');
     expect(title1.textContent).toEqual('new title');
  });

  it("test edit sub title", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid2')).nativeElement;
    expect(component.slots.subtitle).toEqual('new sub title');
    expect(title1.textContent).toEqual('new sub title');
 });
});

// ==== test the element is not hidden and edit value is empty ====
// * ngif visiable
describe("DemoComponent-title-subtitle-editempty", () => {
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
    // set title is empty
    component.slots.title = "";
    // set sub title is empty
    component.slots.subtitle = "";

    fixture.detectChanges();

  });

  it("test edit title", () => {
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#spanid1')).nativeElement;
     expect(component.slots.title).toBeNull;
     expect(title1.textContent).toBeNull;
    //  expect(component.slots.title).toEqual('');
    //  expect(title1.textContent).toEqual('');
  });

  it("test edit sub title", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid2')).nativeElement;
    expect(component.slots.subtitle).toBeNull;
    expect(title1.textContent).toBeNull;
    // expect(component.slots.subtitle).toEqual('');
    // expect(title1.textContent).toEqual('');
 });
});

// ==== test the element is not hidden and edit value more than once====
// * ngif visiable
describe("DemoComponent-title-subtitle-editmutiplytime", () => {
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
 
    for(let i = 1; i <=50 ; i++ ){
      component.slots.title = "title " + i;
    }
  
    for(let i = 1; i <=50 ; i++ ){
      component.slots.subtitle = "sub title " + i;
    }

    fixture.detectChanges();

  });

  it("test edit title more than once", () => {
     const { debugElement } = fixture;
     const title1 = debugElement.query(By.css('#spanid1')).nativeElement;
     expect(component.slots.title).toEqual('title 50');
     expect(title1.textContent).toEqual('title 50');
  });

  it("test edit sub title", () => {
    const { debugElement } = fixture;
    const title1 = debugElement.query(By.css('#spanid2')).nativeElement;
    expect(component.slots.subtitle).toEqual('sub title 50');
    expect(title1.textContent).toEqual('sub title 50');
 });
});
