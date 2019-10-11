import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewLessonComponent } from './create-new-lesson.component';

describe('CreateNewLessonComponent', () => {
  let component: CreateNewLessonComponent;
  let fixture: ComponentFixture<CreateNewLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
