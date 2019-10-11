import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AgeCategoryType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class AgeCategoryService {
  private ageCategoryUrl = 'api/age-category';

  constructor(private http: HttpClient) { }

  getAgeCategories(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.ageCategoryUrl + queryStr);
  }

  addAgeCategory(ageCategory: AgeCategoryType): Observable<any> {
    return this.http.post(this.ageCategoryUrl, ageCategory);
  }

  deleteAgeCategory(id: number): Observable<any> {
    return this.http.delete(`${this.ageCategoryUrl}/${id}`);
  }

  updateAgeCategory(ageCategory: AgeCategoryType): Observable<any> {
    return this.http.patch(`${this.ageCategoryUrl}/${ageCategory.id}`, {
      name: ageCategory.name,
      fromAge: ageCategory.fromAge,
      toAge: ageCategory.toAge,
      active: ageCategory.active
    });
  }

  getAgeCategory(id: number): Observable<any> {
    return this.http.get(`${this.ageCategoryUrl}/${id}`);
  }
}
