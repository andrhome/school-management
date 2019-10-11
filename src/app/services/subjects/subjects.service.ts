import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubjectType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  private subjectUrl = 'api/subject';

  constructor(private http: HttpClient) { }

  getSubjects(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?expand=ageCategories&page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }
    if (params.ageCategory) {
      queryStr += `&age-category-id=${params.ageCategory}`;
    }
    return this.http.get(this.subjectUrl + queryStr);
  }

  addSubject(subject: SubjectType): Observable<any> {
    return this.http.post(this.subjectUrl, subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${this.subjectUrl}/${id}`);
  }

  updateSubject(subject: SubjectType): Observable<any> {
    return this.http.patch(`${this.subjectUrl}/${subject.id}`, {
      name: subject.name,
      ageCategories: subject.ageCategories,
    });
  }

  getSubject(id: number): Observable<any> {
    return this.http.get(`${this.subjectUrl}/${id}`);
  }
}
