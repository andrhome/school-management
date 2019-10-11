import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GroupType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupUrl = 'api/groups';

  constructor(private http: HttpClient) {
  }

  getGroups(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?expand=subdivision,ageCategory&page=${params.page}&per-page=${params.perPage}`;

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.groupUrl + queryStr);
  }

  getGroupById(id: number): Observable<any> {
    return this.http.get(`${this.groupUrl}/${id}`);
  }

  addGroup(group: GroupType): Observable<any> {
    return this.http.post(this.groupUrl, group);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.groupUrl}/${id}`);
  }

  updateGroup(group: GroupType): Observable<any> {
    return this.http.patch(`${this.groupUrl}/${group.id}`, {
      name: group.name,
      subdivision: group.subdivision,
      ageCategory: group.ageCategory
    });
  }
}
