import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicDisciplinesComponent } from './academic-disciplines.component';

describe('AcademicDisciplinesComponent', () => {
  let component: AcademicDisciplinesComponent;
  let fixture: ComponentFixture<AcademicDisciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademicDisciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
