import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UsersService } from '@services/users/users.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/users.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions,
              private service: UsersService,
              private toastr: ToastrService) {
  }

  @Effect()
  getUsers: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.GET_USERS),
    switchMap((action: {[key: string]: any}) => {
      return this.service.getUsers(action.payload).pipe(
        map((users: {[key: string]: any}) => {
          return new actions.GetUsersSuccess(users);
        }),
        catchError(error => of(new actions.GetUsersFailed(error)))
      );
    })
  );

  @Effect()
  addUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.ADD_USER),
    switchMap((action: any) => {
      return this.service.addUser(action.payload).pipe(
        map((user: UserType) => {
          this.toastr.success(`${action.payload.lastName} ${action.payload.firstName} успешно добавлен(а)!`);
          return new actions.AddUserSuccess(user);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при добавлении!`);
          return of(new actions.AddUserFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.DELETE_USER),
    switchMap((action: any) => {
      return this.service.deleteUser(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные ${action.payload.lastName} ${action.payload.firstName} успешно удалены!`);
          return new actions.DeleteUserSuccess(action.payload.id);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при удалении!`);
          return of(new actions.DeleteUserFailed(error));
        })
      );
    })
  );

  @Effect()
  updateUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.UPDATE_USER),
    switchMap((action: any) => {
      return this.service.updateUser(action.payload).pipe(
        map((user: UserType) => {
          this.toastr.success(`Данные ${action.payload.firstName} ${action.payload.lastName} успешно обновлены!`);
          return new actions.UpdateUserSuccess(user);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при обновлении!`);
          return of(new actions.UpdateUserFailed(error));
        })
      );
    })
  );

  @Effect()
  getUser: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.UserActionType.GET_USER_BY_ID),
    switchMap((action: any) => {
      return this.service.getUserById(action.payload).pipe(
        map((user: UserType) => {
          return new actions.GetUserByIdSuccess(user);
        }),
        catchError(error => of(new actions.GetUserByIdFailed(error)))
      );
    })
  );
}
