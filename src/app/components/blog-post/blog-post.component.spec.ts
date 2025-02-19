import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostComponent } from './blog-post.component';
import { PostAppreciationService } from '../../services/post-appreciation/post-appreciation.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostComponent],
      providers: [
        PostAppreciationService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostComponent);

    component = fixture.componentInstance;
    fixture.componentRef.setInput('blogPost', {
      title: 'Test Title',
      content: 'Test Content',
      likeCount: '20',
      id: '1',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
