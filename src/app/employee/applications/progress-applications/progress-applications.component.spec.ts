import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressApplicationsComponent } from './progress-applications.component';

describe('ProgressApplicationsComponent', () => {
  let component: ProgressApplicationsComponent;
  let fixture: ComponentFixture<ProgressApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
