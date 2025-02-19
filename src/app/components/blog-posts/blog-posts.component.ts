import { Component, inject } from '@angular/core';

import { BlogPostComponent } from '../blog-post/blog-post.component';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-blog-posts',
  imports: [CommonModule, BlogPostComponent],
  templateUrl: './blog-posts.component.html',
  styleUrl: './blog-posts.component.scss',
  providers: [PostsService],
})
export class BlogPostsComponent {
  public readonly blogPosts$ = inject(PostsService).getPosts();
}
