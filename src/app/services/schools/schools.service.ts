import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SchoolType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {
  private schoolUrl = 'api/schools';

  constructor(private http: HttpClient) { }

  getSchools(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.schoolUrl + queryStr);
  }

  addSchool(school: SchoolType): Observable<any> {
    return this.http.post(this.schoolUrl, school);
  }

  deleteSchool(id: number): Observable<any> {
    return this.http.delete(`${this.schoolUrl}/${id}`);
  }

  updateSchool(school: SchoolType): Observable<any> {
    return this.http.patch(`${this.schoolUrl}/${school.id}`, {
      name: school.name,
      external: school.external
    });
  }

  getSchoolById(id: number): Observable<any> {
    return this.http.get(`${this.schoolUrl}/${id}`);
  }
}
