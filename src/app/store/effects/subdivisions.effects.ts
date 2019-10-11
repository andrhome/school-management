import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SubdivisionsService } from '@services/subdivisions/subdivisions.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/subdivisions.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SubdivisionType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SubdivisionsEffects {
  constructor(private actions$: Actions,
              private subdivisionsService: SubdivisionsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getSubdivisions: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubdivisionActionType.GET_SUBDIVISIONS),
    switchMap((action: {[key: string]: any}) => {
      return this.subdivisionsService.getSubdivisions(action.payload).pipe(
        map((subdivisions: { [key: string]: any }) => {
          return new actions.GetSubdivisionsSuccess(subdivisions);
        }),
        catchError(error => of(new actions.GetSubdivisionsFailed(error)))
      );
    })
  );

  @Effect()
  addSubdivision: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubdivisionActionType.ADD_SUBDIVISION),
    switchMap((action: any) => {
      return this.subdivisionsService.addSubdivision(action.payload).pipe(
        map((subdivision: SubdivisionType) => {
          this.toastr.success(`Данные подгруппы ${subdivision.name} были успешно добавлены!`);
          return new actions.AddSubdivisionSuccess(subdivision);
        }),
        catchError(error => {
          this.toastr.error(error.message, 'Данные подгруппы не добавлены!');
          return of(new actions.AddSubdivisionFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteSubdivision: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubdivisionActionType.DELETE_SUBDIVISION),
    switchMap((action: any) => {
      return this.subdivisionsService.deleteSubdivision(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные подгруппы ${action.payload.name} были успешно удалены!`);
          return new actions.DeleteSubdivisionSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, 'Данные подгруппы не удалены!');
          return of(new actions.DeleteSubdivisionFailed(error));
        })
      );
    })
  );

  @Effect()
  updateSubdivision: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubdivisionActionType.UPDATE_SUBDIVISION),
    switchMap((action: any) => {
      return this.subdivisionsService.updateSubdivision(action.payload).pipe(
        map((subdivision: SubdivisionType) => {
          this.toastr.success(`Данные подгруппы ${action.payload.name} были успешно изменены!`);
          return new actions.UpdateSubdivisionSuccess(subdivision);
        }),
        catchError(error => {
          this.toastr.error(error.message, 'Данные подгруппы не изменены!');
          return of(new actions.UpdateSubdivisionFailed(error));
        })
      );
    })
  );

  @Effect()
  getSubdivision: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.SubdivisionActionType.GET_SUBDIVISION),
    switchMap((action: any) => {
      return this.subdivisionsService.getSubdivision(action.payload).pipe(
        map((subdivision: SubdivisionType) => {
          return new actions.GetSubdivisionSuccess(subdivision);
        }),
        catchError(error => of(new actions.GetSubdivisionFailed(error)))
      );
    })
  );

}
