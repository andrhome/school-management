import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { GroupsService } from '@services/groups/groups.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/groups.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GroupType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GroupsEffects {
  constructor(private actions$: Actions,
              private groupsService: GroupsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getGroups: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.GroupActionType.GET_GROUPS),
    switchMap((action: {[key: string]: any}) => {
      return this.groupsService.getGroups(action.payload).pipe(
        map((groups: {[key: string]: any}) => {
          return new actions.GetGroupsSuccess(groups);
        }),
        catchError(error => of(new actions.GetGroupsFailed(error)))
      );
    })
  );

  @Effect()
  addGroup: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.GroupActionType.ADD_GROUP),
    switchMap((action: any) => {
      return this.groupsService.addGroup(action.payload).pipe(
        map((group: GroupType) => {
          this.toastr.success(`Данные группы ${group.name} были успешно добавлены!`);
          return new actions.AddGroupSuccess(group);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные группы не добавлены!`);
          return of(new actions.AddGroupFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteGroup: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.GroupActionType.DELETE_GROUP),
    switchMap((action: any) => {
      return this.groupsService.deleteGroup(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные группы ${action.payload.name} были успешно удалены!`);
          return new actions.DeleteGroupSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные группы не удалены!`);
          return of(new actions.DeleteGroupFailed(error));
        })
      );
    })
  );

  @Effect()
  updateGroup: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.GroupActionType.UPDATE_GROUP),
    switchMap((action: any) => {
      return this.groupsService.updateGroup(action.payload).pipe(
        map((group: GroupType) => {
          this.toastr.success(`Данные группы ${group.name} были успешно изменены!`);
          return new actions.UpdateGroupSuccess(group);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные группы не изменены!`);
          return of(new actions.UpdateGroupFailed(error));
        })
      );
    })
  );

  @Effect()
  getGroup: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.GroupActionType.GET_GROUP_BY_ID),
    switchMap((action: any) => {
      return this.groupsService.getGroupById(action.payload).pipe(
        map((group: GroupType) => {
          return new actions.GetGroupByIdSuccess(group);
        }),
        catchError(error => of(new actions.GetGroupByIdFailed(error)))
      );
    })
  );
}
