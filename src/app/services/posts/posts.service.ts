import { GlobalService } from '../global/global.service';
import { IPost } from './interfaces/post.interface';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PostsService extends GlobalService {
  public getPosts(): Observable<Array<IPost>> {
    return this.http.get<Array<IPost>>(`${this.baseUrl}/posts`);
  }
}
