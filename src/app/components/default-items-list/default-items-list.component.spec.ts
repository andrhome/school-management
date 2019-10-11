import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultItemsListComponent } from './default-items-list.component';

describe('DefaultItemsListComponent', () => {
  let component: DefaultItemsListComponent;
  let fixture: ComponentFixture<DefaultItemsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultItemsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
