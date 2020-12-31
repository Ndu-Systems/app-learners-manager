/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDpComponent } from './user-dp.component';

describe('UserDpComponent', () => {
  let component: UserDpComponent;
  let fixture: ComponentFixture<UserDpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
