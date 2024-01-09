import { TestBed } from '@angular/core/testing';

import { UnitOfServiceService } from './unit-of-service.service';

describe('UnitOfServiceService', () => {
  let service: UnitOfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitOfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
