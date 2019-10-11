import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListButtonsSetComponent } from './list-buttons-set.component';

describe('ListButtonsSetComponent', () => {
  let component: ListButtonsSetComponent;
  let fixture: ComponentFixture<ListButtonsSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListButtonsSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListButtonsSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
