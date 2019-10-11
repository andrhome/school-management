import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InterviewType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class InterviewsService {
  private baseUrl = 'api/interviews';

  constructor(private http: HttpClient) {
  }

  getInterviews(params: { [key: string]: any }): Observable<any> {
    let queryStr = `?expand=createdBy,learner,comments,comments.createdBy&page=${params.page}&per-page=${params.perPage}`;

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

    return this.http.get(this.baseUrl + queryStr);
  }

  addInterview(interview: InterviewType): Observable<any> {
    return this.http.post(this.baseUrl, interview);
  }

  deleteInterview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateInterview(interview: InterviewType): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${interview.id}`, {
      meetDate: interview.meetDate,
      context: interview.context,
      arrangements: interview.arrangements,
      learner: interview.learner,
      schoolSideParticipants: interview.schoolSideParticipants,
      familySideParticipants: interview.familySideParticipants,
    });
  }

  getInterviewById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
