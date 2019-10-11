import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PupilType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class PupilsService {
  private pupilUrl = 'api/learners';

  constructor(private http: HttpClient) {
  }

  getPupils(params?: {[key: string]: any}): Observable<any> {
    let queryStr = '?expand=group,leaderTeacher,ageCategory';

    if (params) {
      queryStr += params ? `&page=${params.page}&per-page=${params.perPage}` : '';
      if (params.query) {
        queryStr += `&query=*${params.query}*`;
      }
      if (params.active) {
        queryStr += `&active=${params.active}`;
      }
      if (params.ageCategory) {
        queryStr += `&ageCategory=${params.ageCategory}`;
      }
      if (params.group) {
        queryStr += `&group=${params.group}`;
      }
    }

    return this.http.get(this.pupilUrl + queryStr);
  }

  addPupil(pupil: PupilType): Observable<any> {
    return this.http.post(`${this.pupilUrl}?expand=group,leaderTeacher,ageCategory`, pupil);
  }

  deletePupil(id: number): Observable<any> {
    return this.http.delete(`${this.pupilUrl}/${id}`);
  }

  updatePupil(pupil: PupilType): Observable<any> {
    const pupilId = pupil.id;
    delete pupil.id;
    return this.http.patch(`${this.pupilUrl}/${pupilId}?expand=group,leaderTeacher,ageCategory`, pupil);
  }

  getPupil(id: number): Observable<any> {
    return this.http.get(`${this.pupilUrl}/${id}?expand=group,ageCategory,leaderTeacher`);
  }
}
