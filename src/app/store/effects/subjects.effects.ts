import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SubjectsService } from '@services/subjects/subjects.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/subjects.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SubjectType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SubjectsEffects {
  constructor(private actions$: Actions,
              private subjectsService: SubjectsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getSubjects: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubjectActionType.GET_SUBJECTS),
    switchMap((action: {[key: string]: any}) => {
      return this.subjectsService.getSubjects(action.payload).pipe(
        map((subjects: {[key: string]: any}) => {
          return new actions.GetSubjectsSuccess(subjects);
        }),
        catchError(error => of(new actions.GetSubjectsFailed(error)))
      );
    })
  );

  @Effect()
  addSubject: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubjectActionType.ADD_SUBJECT),
    switchMap((action: any) => {
      return this.subjectsService.addSubject(action.payload).pipe(
        map((subject: SubjectType) => {
          this.toastr.success(`Предмет "${action.payload.name}" был успешно добавлен!`);
          return new actions.AddSubjectSuccess(subject);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при добавлении!`);
          return of(new actions.AddSubjectFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteSubject: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubjectActionType.DELETE_SUBJECT),
    switchMap((action: any) => {
      return this.subjectsService.deleteSubject(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные о предмете ${action.payload.name} были успешно удалены!`);
          return new actions.DeleteSubjectSuccess(action.payload.id);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при удалении!`);
          return of(new actions.DeleteSubjectFailed(error));
        })
      );
    })
  );

  @Effect()
  updateSubject: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubjectActionType.UPDATE_SUBJECT),
    switchMap((action: any) => {
      return this.subjectsService.updateSubject(action.payload).pipe(
        map((subject: SubjectType) => {
          this.toastr.success(`Данные о предмете ${action.payload.name} были успешно обновлены!`);
          return new actions.UpdateSubjectSuccess(subject);
        }),
        catchError(error => {
          this.toastr.error(`${error.message}`, `Ошибка при обновлении!`);
          return of(new actions.UpdateSubjectFailed(error));
        })
      );
    })
  );

  @Effect()
  getSubject: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubjectActionType.GET_SUBJECT),
    switchMap((action: any) => {
      return this.subjectsService.getSubject(action.payload).pipe(
        map((subject: SubjectType) => {
          return new actions.GetSubjectSuccess(subject);
        }),
        catchError(error => of(new actions.GetSubjectFailed(error)))
      );
    })
  );
}
