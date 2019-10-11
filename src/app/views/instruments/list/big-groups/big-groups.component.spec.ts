import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigGroupsComponent } from './big-groups.component';

describe('BigGroupsComponent', () => {
  let component: BigGroupsComponent;
  let fixture: ComponentFixture<BigGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
