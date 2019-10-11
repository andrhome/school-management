import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubdivisionType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionsService {
  private subdivisionUrl = 'api/subdivisions';

  constructor(private http: HttpClient) { }

  getSubdivisions(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?expand=school&page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.subdivisionUrl + queryStr);
  }

  addSubdivision(subdivision: SubdivisionType): Observable<any> {
    return this.http.post(this.subdivisionUrl, subdivision);
  }

  deleteSubdivision(id: number): Observable<any> {
    return this.http.delete(`${this.subdivisionUrl}/${id}`);
  }

  updateSubdivision(subdivision: SubdivisionType): Observable<any> {
    return this.http.patch(`${this.subdivisionUrl}/${subdivision.id}`, {
      name: subdivision.name,
      school: subdivision.school
    });
  }

  getSubdivision(id: number): Observable<any> {
    return this.http.get(`${this.subdivisionUrl}/${id}`);
  }
}
