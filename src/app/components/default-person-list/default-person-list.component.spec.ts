import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultPersonListComponent } from './default-person-list.component';

describe('DefaultPersonListComponent', () => {
  let component: DefaultPersonListComponent;
  let fixture: ComponentFixture<DefaultPersonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultPersonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultPersonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
