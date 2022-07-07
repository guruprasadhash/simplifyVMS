import { TestBed } from '@angular/core/testing';

import { JobreqService } from './jobreq.service';

describe('JobreqService', () => {
  let service: JobreqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobreqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
