import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/interviews.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { InterviewType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';
import { InterviewsService } from '@services/interviews/interviews.service';

@Injectable()
export class InterviewsEffects {
  constructor(private actions$: Actions,
              private interviewsService: InterviewsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getInterviews: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.InterviewActionType.GET_INTERVIEWS),
    switchMap((action: {[key: string]: any}) => {
      return this.interviewsService.getInterviews(action.payload).pipe(
        map((interviews: {[key: string]: any}) => {
          return new actions.GetInterviewsSuccess(interviews);
        }),
        catchError(error => of(new actions.GetInterviewsFailed(error)))
      );
    })
  );

  @Effect()
  addInterview: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.InterviewActionType.ADD_INTERVIEW),
    switchMap((action: any) => {
      return this.interviewsService.addInterview(action.payload).pipe(
        map((interview: InterviewType) => {
          this.toastr.success(`Индивидуальное собеседование успешно сохранено!`);
          return new actions.AddInterviewSuccess(interview);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при сохранении!`);
          return of(new actions.AddInterviewFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteInterview: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.InterviewActionType.DELETE_INTERVIEW),
    switchMap((action: any) => {
      return this.interviewsService.deleteInterview(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Индивидуальное собеседование успешно удаленo!`);
          return new actions.DeleteInterviewSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при удалении!`);
          return of(new actions.DeleteInterviewFailed(error));
        })
      );
    })
  );

  @Effect()
  updateInterview: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.InterviewActionType.UPDATE_INTERVIEW),
    switchMap((action: any) => {
      return this.interviewsService.updateInterview(action.payload).pipe(
        map((interview: InterviewType) => {
          this.toastr.success(`Данные индивидуального собеседования были успешно изменены!`);
          return new actions.UpdateInterviewSuccess(interview);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при изменении!`);
          return of(new actions.UpdateInterviewFailed(error));
        })
      );
    })
  );

  @Effect()
  getInterview: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.InterviewActionType.GET_INTERVIEW_BY_ID),
    switchMap((action: any) => {
      return this.interviewsService.getInterviewById(action.payload).pipe(
        map((interview: InterviewType) => {
          return new actions.GetInterviewByIdSuccess(interview);
        }),
        catchError(error => of(new actions.GetInterviewByIdFailed(error)))
      );
    })
  );
}
