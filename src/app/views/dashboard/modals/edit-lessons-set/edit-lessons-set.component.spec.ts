import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLessonsSetComponent } from './edit-lessons-set.component';

describe('EditLessonsSetComponent', () => {
  let component: EditLessonsSetComponent;
  let fixture: ComponentFixture<EditLessonsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLessonsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLessonsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
