import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFinanceComponent } from './verify-finance.component';

describe('VerifyFinanceComponent', () => {
  let component: VerifyFinanceComponent;
  let fixture: ComponentFixture<VerifyFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyFinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
