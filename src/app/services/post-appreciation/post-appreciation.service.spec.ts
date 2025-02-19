import { TestBed } from '@angular/core/testing';

import { PostAppreciationService } from './post-appreciation.service';

describe('PostAppreciationService', () => {
  let service: PostAppreciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostAppreciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
