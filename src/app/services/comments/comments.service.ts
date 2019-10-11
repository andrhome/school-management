import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommentType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private baseUrl = 'api/notes/comment';

  constructor(private http: HttpClient) {
  }

  addComment(comment: CommentType): Observable<any> {
    return this.http.post(`${this.baseUrl}?expand=createdBy`, comment);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateComment(comment: CommentType): Observable<any> {
    const id = comment.id;
    delete comment.id;
    return this.http.patch(`${this.baseUrl}/${id}`, comment);
  }

}
