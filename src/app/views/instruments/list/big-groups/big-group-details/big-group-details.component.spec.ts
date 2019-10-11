import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigGroupDetailsComponent } from './big-group-details.component';

describe('BigGroupDetailsComponent', () => {
  let component: BigGroupDetailsComponent;
  let fixture: ComponentFixture<BigGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigGroupDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
