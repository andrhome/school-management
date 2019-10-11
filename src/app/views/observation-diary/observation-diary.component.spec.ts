import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDiaryComponent } from './observation-diary.component';

describe('ObservationDiaryComponent', () => {
  let component: ObservationDiaryComponent;
  let fixture: ComponentFixture<ObservationDiaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDiaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
