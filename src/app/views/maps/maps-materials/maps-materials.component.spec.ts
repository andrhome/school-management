import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsMaterialsComponent } from './maps-materials.component';

describe('MapsMaterialsComponent', () => {
  let component: MapsMaterialsComponent;
  let fixture: ComponentFixture<MapsMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
