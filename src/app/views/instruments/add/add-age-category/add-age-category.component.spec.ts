import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgeCategoryComponent } from './add-age-category.component';

describe('AddAgeCategoryComponent', () => {
  let component: AddAgeCategoryComponent;
  let fixture: ComponentFixture<AddAgeCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAgeCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAgeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
