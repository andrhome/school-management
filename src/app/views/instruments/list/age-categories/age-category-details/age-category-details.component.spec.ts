import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCategoryDetailsComponent } from './age-category-details.component';

describe('AgeCategoryDetailsComponent', () => {
  let component: AgeCategoryDetailsComponent;
  let fixture: ComponentFixture<AgeCategoryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeCategoryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCategoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
