import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsNavComponent } from './pupils-nav.component';

describe('PupilsNavComponent', () => {
  let component: PupilsNavComponent;
  let fixture: ComponentFixture<PupilsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
