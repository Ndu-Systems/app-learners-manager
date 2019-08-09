/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParentService } from './parent.service';

describe('Service: Parent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentService]
    });
  });

  it('should ...', inject([ParentService], (service: ParentService) => {
    expect(service).toBeTruthy();
  }));
});
