import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseApplicationComponent } from './close-application.component';

describe('CloseApplicationComponent', () => {
  let component: CloseApplicationComponent;
  let fixture: ComponentFixture<CloseApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
