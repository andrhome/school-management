import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users/users.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserType } from '@app/types/common.types';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService,
              private usersService: UsersService,
              private toastr: ToastrService) {
  }

  @Effect()
  Login: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AuthActionType.LOGIN),
    switchMap((action: {[key: string]: any}) => {
      return this.authService.login(action.payload).pipe(
        map(() => {
          return new actions.LoginSuccess();
        }),
        catchError(error => {
          this.toastr.error(error.message, `Authorization error!`);
          return of(new actions.LoginFailed(error));
        })
      );
    })
  );

  @Effect()
  GetMe: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AuthActionType.GET_ME),
    switchMap(() => {
      return this.usersService.getMe().pipe(
        map((me: UserType) => {
          return new actions.GetMeSuccess(me);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Failed to get user data!`);
          return of(new actions.GetMeFailed(error));
        })
      );
    })
  );

  @Effect()
  Logout: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.AuthActionType.LOGOUT),
    switchMap(() => {
      this.authService.logout();
      return of(new actions.LogoutSuccess());
    })
  );
}
