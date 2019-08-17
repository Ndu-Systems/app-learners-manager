/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ParentLearnerComponent } from './parent-learner.component';

describe('ParentLearnerComponent', () => {
  let component: ParentLearnerComponent;
  let fixture: ComponentFixture<ParentLearnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentLearnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentLearnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
