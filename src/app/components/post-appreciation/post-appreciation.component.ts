import {
  ChangeDetectionStrategy,
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

enum voteResultEnum {
  appreciated = 'appreciated',
  unappreciated = 'unappreciated',
}

type VoteType =
  | voteResultEnum.appreciated
  | voteResultEnum.unappreciated
  | null;

@Component({
  selector: 'app-post-appreciation',
  templateUrl: './post-appreciation.component.html',
  styleUrl: './post-appreciation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PostAppreciationService],
})
export class PostAppreciationComponent implements OnDestroy {
  public appreciation = model.required<number>();
  public readonly postId = input.required<string>();
  public hasNotVoted = signal(true);
  public cannotVote = computed(
    () => this.appreciation() && !this.hasNotVoted()
  );
  public voteButtonSelected = signal<VoteType>(null);
  public voteResultEnum = voteResultEnum;

  private _postAppreciationService = inject(PostAppreciationService);
  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public appreciated() {
    this.handleUserInteraction(voteResultEnum.appreciated);
  }

  public unappreciated() {
    this.handleUserInteraction(voteResultEnum.unappreciated);
  }

  private handleUserInteraction(voteType: VoteType): void {
    const postAppreciated = voteType === voteResultEnum.appreciated;
    this.appreciation.update((currentValue) =>
      postAppreciated ? currentValue + 1 : currentValue - 1
    );
    this.voteButtonSelected.set(voteType);
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
