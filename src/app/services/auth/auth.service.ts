import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenName = 'AUTH_TOKEN';
  public refreshTokenName = 'REFRESH_TOKEN';
  public anonimusTokenName = 'ANON_TOKEN';
  public oauthUrl = 'oauth/v2/token';
  public isAuthorized = !!localStorage.getItem(this.tokenName);

  constructor(private http: HttpClient,
              private router: Router) { }

  login(params: {[key: string]: any}): Observable<any> {
    const authData = {
      'grant_type': 'password',
      'client_id': environment.clientId,
      'client_secret': environment.clientSecret,
      'username': params.email,
      'password': params.password
    };

    return this.http.post(this.oauthUrl, authData).pipe(
      map((res: {[key: string]: any}) => {
        this.saveToken(res.access_token);
        this.saveRefreshToken(res.refresh_token);
        this.markUserAsLoggedIn();
        this.router.navigate(['dashboard']);
      })
    );
  }

  logout(): void {
    this.removeTokens();
    this.markUserAsLoggedOut();
    this.router.navigate(['login']);
  }

  markUserAsLoggedIn(): void {
    this.isAuthorized =  !!this.getToken();
  }

  markUserAsLoggedOut(): void {
    this.isAuthorized = false;
  }

  getToken() {
    return localStorage.getItem(this.tokenName);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenName);
  }

  getAnonymousToken(): any {
    return this.http.post(this.oauthUrl, {
      'grant_type': 'client_credentials',
      'client_id': environment.clientId,
      'client_secret': environment.clientSecret,
    });
  }

  saveToken(token) {
    localStorage.setItem(this.tokenName, token);
  }

  saveRefreshToken(res: string): void {
    localStorage.setItem(this.refreshTokenName, res);
  }

  saveAnonimusToken(token: string): void {
    localStorage.setItem(this.anonimusTokenName, token);
  }

  removeTokens() {
    localStorage.removeItem(this.tokenName);
    localStorage.removeItem(this.refreshTokenName);
    localStorage.removeItem(this.anonimusTokenName);
  }

  refreshAccessToken(): Observable<any> {
    const authTokenParams = {
      'grant_type': 'refresh_token',
      'client_id': environment.clientId,
      'client_secret': environment.clientSecret,
      'refresh_token': this.getRefreshToken()
    };

    return this.http.post(this.oauthUrl, authTokenParams).pipe(
      map(
        (res: {[key: string]: any}) => {
          this.saveToken(res.access_token);
          this.saveRefreshToken(res.refresh_token);
          return res;
        },
        err => console.log(`Refresh token ERROR: ${err}`)
      )
    );
  }
}
