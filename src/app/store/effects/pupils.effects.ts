import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { PupilsService } from '@services/pupils/pupils.service';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/pupils.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PupilType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PupilsEffects {
  constructor(private actions$: Actions,
              private pupilsService: PupilsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getPupils: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.PupilActionType.GET_PUPILS),
    switchMap((action: {[key: string]: any}) => {
      return this.pupilsService.getPupils(action.payload).pipe(
        map((pupils: {[key: string]: any}) => {
          return new actions.GetPupilsSuccess(pupils);
        }),
        catchError(error => of(new actions.GetPupilsFailed(error)))
      );
    })
  );

  @Effect()
  addPupil: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.PupilActionType.ADD_PUPIL),
    switchMap((action: any) => {
      return this.pupilsService.addPupil(action.payload).pipe(
        map((pupil: PupilType) => {
          this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно добавлены!`);
          return new actions.AddPupilSuccess(pupil);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные ученика не добавлены!`);
          return of(new actions.AddPupilFailed(error));
        })
      );
    })
  );

  @Effect()
  deletePupil: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.PupilActionType.DELETE_PUPIL),
    switchMap((action: any) => {
      return this.pupilsService.deletePupil(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно удалены!`);
          return new actions.DeletePupilSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные ученика не удалены!`);
          return of(new actions.DeletePupilFailed(error));
        })
      );
    })
  );

  @Effect()
  updatePupil: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.PupilActionType.UPDATE_PUPIL),
    switchMap((action: any) => {
      return this.pupilsService.updatePupil(action.payload).pipe(
        map((pupil: PupilType) => {
          this.toastr.success(`Данные ученика ${action.payload.firstName} ${action.payload.lastName} были успешно изменены!`);
          return new actions.UpdatePupilSuccess(pupil);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Данные ученика не изменены!`);
          return of(new actions.UpdatePupilFailed(error));
        })
      );
    })
  );

  @Effect()
  getPupil: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.PupilActionType.GET_PUPIL_BY_ID),
    switchMap((action: any) => {
      return this.pupilsService.getPupil(action.payload).pipe(
        map((pupil: PupilType) => {
          return new actions.GetPupilByIdSuccess(pupil);
        }),
        catchError(error => of(new actions.GetPupilByIdFailed(error)))
      );
    })
  );
}
