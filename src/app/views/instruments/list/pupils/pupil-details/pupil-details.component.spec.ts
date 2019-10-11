import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilDetailsComponent } from './pupil-details.component';

describe('PupilDetailsComponent', () => {
  let component: PupilDetailsComponent;
  let fixture: ComponentFixture<PupilDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
