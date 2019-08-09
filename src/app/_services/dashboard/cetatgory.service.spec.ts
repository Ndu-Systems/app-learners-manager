/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CetatgoryService } from './cetatgory.service';

describe('Service: Cetatgory', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CetatgoryService]
    });
  });

  it('should ...', inject([CetatgoryService], (service: CetatgoryService) => {
    expect(service).toBeTruthy();
  }));
});
