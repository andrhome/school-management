import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapMaterialsComponent } from './add-map-materials.component';

describe('AddMapMaterialsComponent', () => {
  let component: AddMapMaterialsComponent;
  let fixture: ComponentFixture<AddMapMaterialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMapMaterialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMapMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
