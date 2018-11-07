import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourApplicationsComponent } from './your-applications.component';

describe('YourApplicationsComponent', () => {
  let component: YourApplicationsComponent;
  let fixture: ComponentFixture<YourApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
