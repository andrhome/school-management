import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KisComponent } from './kis.component';

describe('KisComponent', () => {
  let component: KisComponent;
  let fixture: ComponentFixture<KisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
