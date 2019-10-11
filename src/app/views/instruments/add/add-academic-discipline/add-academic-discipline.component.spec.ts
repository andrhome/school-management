import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAcademicDisciplineComponent } from './add-academic-discipline.component';

describe('AddAcademicDisciplineComponent', () => {
  let component: AddAcademicDisciplineComponent;
  let fixture: ComponentFixture<AddAcademicDisciplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAcademicDisciplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAcademicDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
