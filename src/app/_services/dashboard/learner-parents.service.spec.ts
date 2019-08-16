/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LearnerParentsService } from './learner-parents.service';

describe('Service: LearnerParents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LearnerParentsService]
    });
  });

  it('should ...', inject([LearnerParentsService], (service: LearnerParentsService) => {
    expect(service).toBeTruthy();
  }));
});
