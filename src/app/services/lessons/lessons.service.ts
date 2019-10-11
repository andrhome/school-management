import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonType, MultipleLessonType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {
  private baseUrl = 'api/lesson';

  constructor(private http: HttpClient) { }

  getLessons(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?expand=subject,teacher,group,recurringObject&page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }
    if (params.startDate) {
      queryStr += `&startDate=${params.startDate}`;
    }
    if (params.group) {
      queryStr += `&group=${params.group}`;
    }

    return this.http.get(this.baseUrl + queryStr);
  }

  getLessonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addLesson(lesson: LessonType): Observable<any> {
    return this.http.post(`${this.baseUrl}/multiple`, lesson);
  }

  deleteOneLesson(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  deleteLessons(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/multiple/${id}`);
  }

  updateOneLesson(lesson: LessonType): Observable<any> {
    const lessonId = lesson.id;
    delete lesson.id;
    return this.http.patch(`${this.baseUrl}/${lessonId}`, lesson);
  }

  updateLessons(lesson: MultipleLessonType): Observable<any> {
    const lessonId = lesson.id;
    delete lesson.id;
    return this.http.patch(`${this.baseUrl}/multiple/${lessonId}`, lesson);
  }
}
