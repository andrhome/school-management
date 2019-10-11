import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormNavComponent } from './add-form-nav.component';

describe('AddFormNavComponent', () => {
  let component: AddFormNavComponent;
  let fixture: ComponentFixture<AddFormNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFormNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
