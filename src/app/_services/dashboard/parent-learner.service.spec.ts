/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParentLearnerService } from './parent-learner.service';

describe('Service: ParentLearner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentLearnerService]
    });
  });

  it('should ...', inject([ParentLearnerService], (service: ParentLearnerService) => {
    expect(service).toBeTruthy();
  }));
});
