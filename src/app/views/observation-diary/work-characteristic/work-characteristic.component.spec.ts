import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCharacteristicComponent } from './work-characteristic.component';

describe('WorkCharacteristicComponent', () => {
  let component: WorkCharacteristicComponent;
  let fixture: ComponentFixture<WorkCharacteristicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkCharacteristicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
