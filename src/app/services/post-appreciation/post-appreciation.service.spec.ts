import { PostAppreciationService } from './post-appreciation.service';
import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostAppreciationService', () => {
  let service: PostAppreciationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostAppreciationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PostAppreciationService);
  });

  describe('Testing appreciatePost()', () => {
    it('should return a PostDTO object on subscription when called', () => {
      spyOn(service['http'], 'patch').and.callThrough();

      service.appreciatePost('1', 12).subscribe((res) => {
        expect(res).toEqual({
          likeCount: 12,
        });
      });

      expect(service['http'].patch).toHaveBeenCalled();
    });
  });
});
