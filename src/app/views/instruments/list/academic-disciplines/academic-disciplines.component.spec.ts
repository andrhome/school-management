import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademincDisciplinesComponent } from './academic-disciplines.component';

describe('AcademincDisciplinesComponent', () => {
  let component: AcademincDisciplinesComponent;
  let fixture: ComponentFixture<AcademincDisciplinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcademincDisciplinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademincDisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
