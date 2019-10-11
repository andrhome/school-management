import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MapMaterialsType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class MaterialMapsService {
  private baseUrl = 'api/material-map';

  constructor(private http: HttpClient) { }

  getMaterialMaps(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?expand=ageCategory,zones.subjects.materials,zones.subjects.subject&page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.baseUrl + queryStr);
  }

  addMaterialMap(material: MapMaterialsType): Observable<any> {
    return this.http.post(`${this.baseUrl}?expand=ageCategory,zones.subjects.materials,zones.subjects.subject`, material);
  }

  deleteMaterialMap(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateMaterialMap(item: MapMaterialsType): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${item.id}?expand=ageCategory,zones.subjects.materials,zones.subjects.subject`, {
      name: item.name,
      ageCategory: item.ageCategory,
      zones: item.zones || []
    });
  }

  getMaterialMap(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}?expand=ageCategory,zones.subjects.materials,zones.subjects.subject`);
  }
}
