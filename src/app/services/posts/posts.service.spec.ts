import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { PostsService } from './posts.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PostsService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
