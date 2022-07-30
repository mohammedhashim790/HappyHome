import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loandetail2Component } from './loandetail2.component';

describe('Loandetail2Component', () => {
  let component: Loandetail2Component;
  let fixture: ComponentFixture<Loandetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Loandetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Loandetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
