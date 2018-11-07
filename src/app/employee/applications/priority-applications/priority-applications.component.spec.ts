import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityApplicationsComponent } from './priority-applications.component';

describe('PriorityApplicationsComponent', () => {
  let component: PriorityApplicationsComponent;
  let fixture: ComponentFixture<PriorityApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
