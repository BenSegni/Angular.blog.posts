import {
  Component,
  OnDestroy,
  computed,
  inject,
  input,
  model,
  signal,
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
  public hasNotVoted = signal(true);
  public cannotVote = computed(
    () => this.appreciation() && !this.hasNotVoted()
  );

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
        next: () => this.hasNotVoted.set(false),
        error: (error) => {
          console.error(error);
          this.appreciation.set(appreciation - 1);
          this.hasNotVoted.set(true);
        },
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
