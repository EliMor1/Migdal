import { TestBed } from '@angular/core/testing';

import { GarageStateService } from './garage-state.service';

describe('GarageStateService', () => {
  let service: GarageStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GarageStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
