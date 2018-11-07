import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyNewApplicationsComponent } from './verify-new-applications.component';

describe('VerifyNewApplicationsComponent', () => {
  let component: VerifyNewApplicationsComponent;
  let fixture: ComponentFixture<VerifyNewApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyNewApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyNewApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
