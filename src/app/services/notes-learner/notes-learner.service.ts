import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NoteLearnerType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class NotesLearnerService {
  private notesLearnerUrl = 'api/notes';

  constructor(private http: HttpClient) {
  }

  getNotesLearner(params?: {[key: string]: any}): Observable<any> {
    let queryStr = '?expand=comments,comments.createdBy,createdBy,subject';

    if (params) {
      queryStr += params ? `&page=${params.page}&per-page=${params.perPage}` : '';
      if (params.type) {
        queryStr += `&type=${params.type}`;
      }
      if (params.query) {
        queryStr += `&query=*${params.query}*`;
      }
      if (params.learner) {
        queryStr += `&learner=${params.learner}`;
      }
      if (params.createdBy) {
        queryStr += `&createdBy=${params.createdBy}`;
      }
      if (params.createdAt) {
        queryStr += `&createdAt=${params.createdAt}`;
      }
    }

    return this.http.get(this.notesLearnerUrl + queryStr);
  }

  addNoteLearner(noteLearner: NoteLearnerType): Observable<any> {
    return this.http.post(this.notesLearnerUrl, noteLearner);
  }

  deleteNoteLearner(id: number): Observable<any> {
    return this.http.delete(`${this.notesLearnerUrl}/${id}`);
  }

  updateNoteLearner(noteLearner: NoteLearnerType): Observable<any> {
    const pupilId = noteLearner.id;
    delete noteLearner.id;
    return this.http.patch(`${this.notesLearnerUrl}/${pupilId}`, noteLearner);
  }

  getNoteLearner(id: number): Observable<any> {
    return this.http.get(`${this.notesLearnerUrl}/${id}?expand=comments`);
  }
}
