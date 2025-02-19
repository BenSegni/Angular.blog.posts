import { IPost, PostDTO } from '../posts/interfaces/post.interface';

import { GlobalService } from '../global/global.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PostAppreciationService extends GlobalService {
  public appreciatePost(id: string, appreciation: number): Observable<PostDTO> {
    return this.http.patch<IPost>(`${this.baseUrl}/posts/${id}`, {
      likeCount: appreciation,
    });
  }
}
