import {
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { PostAppreciationService } from '../../services/post-appreciation/post-appreciation.service';

@Component({
  selector: 'app-post-appreciation',
  templateUrl: './post-appreciation.component.html',
  styleUrl: './post-appreciation.component.scss',
  providers: [PostAppreciationService],
})
export class PostAppreciationComponent implements OnDestroy {
  public appreciation = model.required<number>();
  public readonly postId = input.required<string>();
  public likeCount = computed(() => this.appreciation());
  public hasVoted = false;
  private _postAppreciationService = inject(PostAppreciationService);
  private destroy$ = new Subject<void>();

  public appreciate() {
    this.appreciation.update((currentValue) => currentValue + 1);
    this.sendPostAppreciationUpdate(this.appreciation());
  }

  public unappreciate() {
    this.appreciation.update((currentValue) => currentValue - 1);
    this.sendPostAppreciationUpdate(this.appreciation());
  }

  private sendPostAppreciationUpdate(appreciation: number): void {
    this._postAppreciationService
      .appreciatePost(this.postId(), appreciation)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => (this.hasVoted = true),
        error: (error) => {
          console.error(error);
          this.appreciation.set(appreciation - 1);
          this.hasVoted = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
