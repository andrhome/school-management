import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { environment } from '@env/environment';
import { catchError, filter, finalize, switchMap, take, flatMap } from 'rxjs/internal/operators';

@Injectable()
export class HttpReqInterceptor implements HttpInterceptor {
  private isRefreshingToken = false;
  private tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let fullUrl = `${environment.apiBase}/${req.url}`;
    const token = this.authService.getToken();

    if (req.url.indexOf('assets/images') !== -1) {
      fullUrl = req.url;
    }

    if (req.url.indexOf(this.authService.oauthUrl) !== -1) {
      req = req.clone({ url: fullUrl });

      return next.handle(req);
    }

    if (token) {
      req = req.clone({ url: fullUrl, headers: req.headers.set('Authorization', 'Bearer ' + token) });
      return next.handle(req).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            console.log(err);
            if ((<HttpErrorResponse>err).status === 401) {
              return this.handleUnauthorized(req, next);
            } else {
              return throwError(err);
            }
          }
        })
      );
    }

    return this.authService.getAnonymousToken().pipe(
      flatMap((response: any) => {
        this.authService.saveAnonimusToken(response.access_token);
        req = req.clone({ url: fullUrl, headers: req.headers.set('Authorization', 'Bearer ' + response.access_token) });
        return next.handle(req);
      })
    );
  }

  private handleUnauthorized(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next(null);

      return this.authService.refreshAccessToken().pipe(
        switchMap(res => {
          const newToken = res['access_token'];
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(this.addToken(req, newToken));
          }

          return throwError(null);
        }),
        catchError(error => {
          console.log(error);
          this.authService.logout();
          return throwError(error);
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      this.isRefreshingToken = false;
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        })
      );
    }
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    let contentType = {};
    if (req.headers.get('Content-Type') === 'application/json') {
      contentType = { 'Content-Type': 'application/json' };
    }

    return req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
        ...contentType
      }
    });
  }
}
