import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLoadComponent } from './change-load.component';

describe('ChangeLoadComponent', () => {
  let component: ChangeLoadComponent;
  let fixture: ComponentFixture<ChangeLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
