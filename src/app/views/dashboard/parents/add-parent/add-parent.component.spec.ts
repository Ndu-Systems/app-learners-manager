/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddParentComponent } from './add-parent.component';

describe('AddParentComponent', () => {
  let component: AddParentComponent;
  let fixture: ComponentFixture<AddParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
