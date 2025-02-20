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
  public voteButtonSelected = signal<'appreciated' | 'unappreciated' | null>(
    null
  );

  private _postAppreciationService = inject(PostAppreciationService);
  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public appreciated() {
    this.appreciation.update((currentValue) => currentValue + 1);
    this.voteButtonSelected.set('appreciated');
    this.sendPostAppreciationUpdate(this.appreciation());
  }

  public unappreciated() {
    this.appreciation.update((currentValue) => currentValue - 1);
    this.voteButtonSelected.set('unappreciated');
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
}
