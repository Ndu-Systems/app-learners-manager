/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TakeTestComponent } from './take-test.component';

describe('TakeTestComponent', () => {
  let component: TakeTestComponent;
  let fixture: ComponentFixture<TakeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
