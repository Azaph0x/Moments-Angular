import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/invironment';

import { Comment } from '../Comment';
import { Response } from '../Response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseApirl = environment.baseApiUrl
  private apiUrl = `${this.baseApirl}api/moments`

  constructor(private httpClient: HttpClient) { }

  createComment(data: Comment): Observable<Response<Comment>> {
    const url = `${this.apiUrl}/${data.momentId}/comments`
    return this.httpClient.post<Response<Comment>>(url, data)
  }
}
