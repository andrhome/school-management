import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PupilsGroupsFilterComponent } from './pupils-groups-filter.component';

describe('PupilsGroupsFilterComponent', () => {
  let component: PupilsGroupsFilterComponent;
  let fixture: ComponentFixture<PupilsGroupsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PupilsGroupsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PupilsGroupsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
