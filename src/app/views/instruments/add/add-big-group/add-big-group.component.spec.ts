import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBigGroupComponent } from './add-big-group.component';

describe('AddBigGroupComponent', () => {
  let component: AddBigGroupComponent;
  let fixture: ComponentFixture<AddBigGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBigGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBigGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
