import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { PostAppreciationService } from './post-appreciation.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostAppreciationService', () => {
  let service: PostAppreciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostAppreciationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PostAppreciationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
