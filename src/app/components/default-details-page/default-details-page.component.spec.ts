import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDetailsPageComponent } from './default-details-page.component';

describe('DefaultDetailsPageComponent', () => {
  let component: DefaultDetailsPageComponent;
  let fixture: ComponentFixture<DefaultDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
