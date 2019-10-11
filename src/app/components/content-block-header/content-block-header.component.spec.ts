import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBlockHeaderComponent } from './content-block-header.component';

describe('ContentBlockHeaderComponent', () => {
  let component: ContentBlockHeaderComponent;
  let fixture: ComponentFixture<ContentBlockHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentBlockHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBlockHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
