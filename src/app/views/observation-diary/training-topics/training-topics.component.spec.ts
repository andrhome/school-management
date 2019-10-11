import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingTopicsComponent } from './training-topics.component';

describe('TrainingTopicsComponent', () => {
  let component: TrainingTopicsComponent;
  let fixture: ComponentFixture<TrainingTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
