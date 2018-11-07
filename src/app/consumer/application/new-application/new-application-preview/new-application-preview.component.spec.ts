import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApplicationPreviewComponent } from './new-application-preview.component';

describe('NewApplicationPreviewComponent', () => {
  let component: NewApplicationPreviewComponent;
  let fixture: ComponentFixture<NewApplicationPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewApplicationPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApplicationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
