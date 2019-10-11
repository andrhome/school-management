import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPupilComponent } from './add-pupil.component';

describe('AddPupilComponent', () => {
  let component: AddPupilComponent;
  let fixture: ComponentFixture<AddPupilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPupilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPupilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
