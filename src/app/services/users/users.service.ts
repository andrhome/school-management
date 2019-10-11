import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserType } from '@app/types/common.types';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'api/users';

  constructor(private http: HttpClient) { }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  getUsers(params: {[key: string]: any}): Observable<any> {
    let queryStr = `?page=${params.page}&per-page=${params.perPage}`;

    if (params.role && (typeof(params.role) === 'string')) {
      queryStr += `&role=${params.role}`;
    }

    if (params.role && (typeof(params.role) === 'object')) {
      params.role.forEach((el, i) => {
        queryStr += `&role[${i}]=${el}`;
      });
    }

    if (params.query) {
      queryStr += `&query=*${params.query}*`;
    }

    return this.http.get(this.baseUrl + queryStr);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addUser(user: UserType): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateUser(user: UserType): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${user.id}`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // plainPassword: user.plainPassword,
      role: user.role,
    });
  }
}
