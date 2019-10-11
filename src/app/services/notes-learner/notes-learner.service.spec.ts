import { TestBed } from '@angular/core/testing';

import { NotesLearnerService } from './notes-learner.service';

describe('NotesLearner', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotesLearnerService = TestBed.get(NotesLearnerService);
    expect(service).toBeTruthy();
  });
});
