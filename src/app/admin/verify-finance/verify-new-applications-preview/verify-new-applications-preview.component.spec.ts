import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNewApplicationsPreviewComponent } from './verify-new-applications-preview.component';

describe('VerifyNewApplicationsPreviewComponent', () => {
  let component: VerifyNewApplicationsPreviewComponent;
  let fixture: ComponentFixture<VerifyNewApplicationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyNewApplicationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyNewApplicationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
