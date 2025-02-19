import { Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { IPost } from '../../services/posts/interfaces/post.interface';
import { PostAppreciationComponent } from '../post-appreciation/post-appreciation.component';

@Component({
  selector: 'app-blog-post',
  imports: [CommonModule, PostAppreciationComponent],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent {
  public blogPost = input.required<IPost>();
}
