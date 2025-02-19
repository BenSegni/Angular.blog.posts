import { Injectable, inject, isDevMode } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { config } from '../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public readonly http: HttpClient = inject(HttpClient);
  public readonly baseUrl: string = isDevMode()
    ? `${config.development.endpoint}${config.development.port}`
    : `${config.production.endpoint}${config.production.port}`;
}
