import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCategoriesComponent } from './age-categories.component';

describe('AgeCategoriesComponent', () => {
  let component: AgeCategoriesComponent;
  let fixture: ComponentFixture<AgeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
