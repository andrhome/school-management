import { TestBed } from '@angular/core/testing';
import { InterviewsService } from '@services/interviews/interviews.service';

describe('InterviewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewsService = TestBed.get(InterviewsService);
    expect(service).toBeTruthy();
  });
});
