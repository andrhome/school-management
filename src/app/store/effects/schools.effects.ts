import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SchoolsService } from '@services/schools/schools.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/schools.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SchoolType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SchoolsEffects {
  constructor(private actions$: Actions,
              private schoolsService: SchoolsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getSchools: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SchoolActionType.GET_SCHOOLS),
    switchMap((action: {[key: string]: any}) => {
      return this.schoolsService.getSchools(action.payload).pipe(
        map((schools: {[key: string]: any}) => {
          return new actions.GetSchoolsSuccess(schools);
        }),
        catchError(error => of(new actions.GetSchoolsFailed(error)))
      );
    })
  );

  @Effect()
  addSchool: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SchoolActionType.ADD_SCHOOL),
    switchMap((action: any) => {
      return this.schoolsService.addSchool(action.payload).pipe(
        map((school: SchoolType) => {
          this.toastr.success(`Данные школы ${school.name} были успешно изменены!`);
          return new actions.AddSchoolSuccess(school);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные школы не изменены!`);
          return of(new actions.AddSchoolFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteSchool: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SchoolActionType.DELETE_SCHOOL),
    switchMap((action: any) => {
      return this.schoolsService.deleteSchool(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные школы ${action.payload.name} были успешно удалены!`);
          return new actions.DeleteSchoolSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные школы не удалены!`);
          return of(new actions.DeleteSchoolFailed(error));
        })
      );
    })
  );

  @Effect()
  updateSchool: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SchoolActionType.UPDATE_SCHOOL),
    switchMap((action: any) => {
      return this.schoolsService.updateSchool(action.payload).pipe(
        map((school: SchoolType) => {
          this.toastr.success(`Данные школы ${school.name} были успешно добавлены!`);
          return new actions.UpdateSchoolSuccess(school);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные школы не добавлены!`);
          return of(new actions.UpdateSchoolFailed(error));
        })
      );
    })
  );

  @Effect()
  getSchool: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SchoolActionType.GET_SCHOOL_BY_ID),
    switchMap((action: any) => {
      return this.schoolsService.getSchoolById(action.payload).pipe(
        map((school: SchoolType) => {
          return new actions.GetSchoolByIdSuccess(school);
        }),
        catchError(error => of(new actions.GetSchoolByIdFailed(error)))
      );
    })
  );
}
