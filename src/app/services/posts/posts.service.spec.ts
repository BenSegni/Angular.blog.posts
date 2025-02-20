import { PostsService } from './posts.service';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(PostsService);
  });

  describe('Testing appreciatePost()', () => {
    it('should return a IPost array on subscription when called', () => {
      const mockResponse = [
        {
          title: 'Test Title',
          content: 'Test Content',
          likeCount: 1,
          id: '1',
        },
      ];

      spyOn(service['http'], 'get').and.returnValue(of(mockResponse));

      service.getPosts().subscribe((res) => {
        expect(res).toEqual(mockResponse);
      });

      expect(service['http'].get).toHaveBeenCalled();
    });
  });
});
