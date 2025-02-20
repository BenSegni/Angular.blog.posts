import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsComponent } from './blog-posts.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BlogPostsComponent', () => {
  let component: BlogPostsComponent;
  let fixture: ComponentFixture<BlogPostsComponent>;


  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [BlogPostsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Testing Blog Posts Rendering', () => {
    it('should show error message if subscription fails', () => {
      component.blogPosts$.subscribe();
      const errorMessage = fixture.nativeElement.querySelector(
        '#problem-loading-articles'
      );

      fixture.detectChanges();

      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain(
        'There has been a problem loading the Blog Posts.'
      );
    });
  });
});
