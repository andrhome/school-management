import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RenameLessonComponent } from './rename-lesson.component';

describe('RenameLessonComponent', () => {
  let component: RenameLessonComponent;
  let fixture: ComponentFixture<RenameLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenameLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
