import { TestBed } from '@angular/core/testing';

import { LuckMeterService } from './luck-meter.service';

describe('LuckMeterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LuckMeterService = TestBed.get(LuckMeterService);
    expect(service).toBeTruthy();
  });
});
