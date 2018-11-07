import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeApplicationsListComponent } from './employee-applications-list.component';

describe('EmployeeApplicationsListComponent', () => {
  let component: EmployeeApplicationsListComponent;
  let fixture: ComponentFixture<EmployeeApplicationsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeApplicationsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeApplicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
