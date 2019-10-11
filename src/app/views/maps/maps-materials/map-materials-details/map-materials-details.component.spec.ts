import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMaterialsDetailsComponent } from './map-materials-details.component';

describe('MapMaterialsDetailsComponent', () => {
  let component: MapMaterialsDetailsComponent;
  let fixture: ComponentFixture<MapMaterialsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMaterialsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMaterialsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
