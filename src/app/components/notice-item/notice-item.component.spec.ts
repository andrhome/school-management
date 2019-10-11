import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticeItemComponent } from './notice-item.component';

describe('NoticeItemComponent', () => {
  let component: NoticeItemComponent;
  let fixture: ComponentFixture<NoticeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoticeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
