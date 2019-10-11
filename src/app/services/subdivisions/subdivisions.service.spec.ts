import { TestBed } from '@angular/core/testing';

import { SubdivisionsService } from './subdivisions.service';

describe('SchoolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubdivisionsService = TestBed.get(SubdivisionsService);
    expect(service).toBeTruthy();
  });
});
