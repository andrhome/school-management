import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekDaysCheckboxesComponent } from './week-days-checkboxes.component';

describe('WeekDaysCheckboxesComponent', () => {
  let component: WeekDaysCheckboxesComponent;
  let fixture: ComponentFixture<WeekDaysCheckboxesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekDaysCheckboxesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekDaysCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
