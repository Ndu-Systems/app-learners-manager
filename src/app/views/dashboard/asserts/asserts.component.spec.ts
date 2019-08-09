/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AssertsComponent } from './asserts.component';

describe('AssertsComponent', () => {
  let component: AssertsComponent;
  let fixture: ComponentFixture<AssertsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssertsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
