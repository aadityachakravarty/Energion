import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCompletedApplicationsPreviewComponent } from './verify-completed-applications-preview.component';

describe('VerifyCompletedApplicationsPreviewComponent', () => {
  let component: VerifyCompletedApplicationsPreviewComponent;
  let fixture: ComponentFixture<VerifyCompletedApplicationsPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCompletedApplicationsPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCompletedApplicationsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
