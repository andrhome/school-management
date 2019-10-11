import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCalendarComponent } from './data-calendar.component';

describe('DataCalendarComponent', () => {
  let component: DataCalendarComponent;
  let fixture: ComponentFixture<DataCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
