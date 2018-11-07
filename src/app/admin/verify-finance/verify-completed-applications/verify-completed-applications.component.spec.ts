import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCompletedApplicationsComponent } from './verify-completed-applications.component';

describe('VerifyCompletedApplicationsComponent', () => {
  let component: VerifyCompletedApplicationsComponent;
  let fixture: ComponentFixture<VerifyCompletedApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCompletedApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCompletedApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
