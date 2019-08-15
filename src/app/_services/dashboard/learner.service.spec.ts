/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LearnerService } from './learner.service';

describe('Service: Learner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LearnerService]
    });
  });

  it('should ...', inject([LearnerService], (service: LearnerService) => {
    expect(service).toBeTruthy();
  }));
});
