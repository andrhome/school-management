import { TestBed } from '@angular/core/testing';
import { MaterialMapsService } from '@services/material-maps/material-maps.service';

describe('SchoolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialMapsService = TestBed.get(MaterialMapsService);
    expect(service).toBeTruthy();
  });
});
