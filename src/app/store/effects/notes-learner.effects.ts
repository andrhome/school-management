import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import * as actions from '@store/actions/notes-learner.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NoteLearnerType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';
import { NotesLearnerService } from '@services/notes-learner/notes-learner.service';

@Injectable()
export class NotesLearnerEffects {
  constructor(private actions$: Actions,
              private notesLearnerService: NotesLearnerService,
              private toastr: ToastrService) {
  }

  @Effect()
  getNotes: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.NoteLearnerActionType.GET_NOTES_LEARNER),
    switchMap((action: {[key: string]: any}) => {
      return this.notesLearnerService.getNotesLearner(action.payload).pipe(
        map((notesLearner: {[key: string]: any}) => {
          return new actions.GetNotesLearnerSuccess(notesLearner);
        }),
        catchError(error => of(new actions.GetNotesLearnerFailed(error)))
      );
    })
  );

  @Effect()
  addNote: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.NoteLearnerActionType.ADD_NOTE_LEARNER),
    switchMap((action: any) => {
      return this.notesLearnerService.addNoteLearner(action.payload).pipe(
        map((notesLearner: NoteLearnerType) => {
          this.toastr.success(`Заметка была успешно добавлена!`);
          return new actions.AddNoteLearnerSuccess(notesLearner);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при добавлении!`);
          return of(new actions.AddNoteLearnerFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteNote: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.NoteLearnerActionType.DELETE_NOTE_LEARNER),
    switchMap((action: any) => {
      return this.notesLearnerService.deleteNoteLearner(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Заметка была успешно удалена!`);
          return new actions.DeleteNoteLearnerSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при удалении!`);
          return of(new actions.DeleteNoteLearnerFailed(error));
        })
      );
    })
  );

  @Effect()
  updateNote: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.NoteLearnerActionType.UPDATE_NOTE_LEARNER),
    switchMap((action: any) => {
      return this.notesLearnerService.updateNoteLearner(action.payload).pipe(
        map((notesLearner: NoteLearnerType) => {
          this.toastr.success(`Изменения заметки были успешно сохранены!`);
          return new actions.UpdateNoteLearnerSuccess(notesLearner);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка при сохранении!`);
          return of(new actions.UpdateNoteLearnerFailed(error));
        })
      );
    })
  );

  @Effect()
  getNote: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.NoteLearnerActionType.GET_NOTE_LEARNER_BY_ID),
    switchMap((action: any) => {
      return this.notesLearnerService.getNoteLearner(action.payload).pipe(
        map((notesLearner: NoteLearnerType) => {
          return new actions.GetNoteLearnerByIdSuccess(notesLearner);
        }),
        catchError(error => of(new actions.GetNoteLearnerByIdFailed(error)))
      );
    })
  );
}
