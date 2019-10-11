import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLessonComponent } from './delete-lesson.component';

describe('DeleteLessonComponent', () => {
  let component: DeleteLessonComponent;
  let fixture: ComponentFixture<DeleteLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
