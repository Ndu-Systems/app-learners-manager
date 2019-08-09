/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssertService } from './assert.service';

describe('Service: Assert', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssertService]
    });
  });

  it('should ...', inject([AssertService], (service: AssertService) => {
    expect(service).toBeTruthy();
  }));
});
