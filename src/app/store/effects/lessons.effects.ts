import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LessonsService } from '@services/lessons/lessons.service';
import * as actions from '@store/actions/lessons.actions';
import { LessonType, MultipleLessonType } from '@app/types/common.types';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class LessonsEffects {
  constructor(private actions$: Actions,
              private lessonsService: LessonsService,
              private toastr: ToastrService) {
  }

  @Effect()
  getLessons: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.GET_LESSONS),
    switchMap((action: {[key: string]: any}) => {
      return this.lessonsService.getLessons(action.payload).pipe(
        map((lessons: {[key: string]: any}) => {
          return new actions.GetLessonsSuccess(lessons);
        }),
        catchError(error => of(new actions.GetLessonsFailed(error)))
      );
    })
  );

  @Effect()
  addLesson: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.ADD_LESSON),
    switchMap((action: any) => {
      return this.lessonsService.addLesson(action.payload).pipe(
        map((lesson: LessonType) => {
          this.toastr.success(`Урок успешно добавлен!`);
          return new actions.AddLessonSuccess(lesson);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка добавления урока!`);
          return of(new actions.AddLessonFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteOneLesson: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.DELETE_ONE_LESSON),
    switchMap((action: any) => {
      return this.lessonsService.deleteOneLesson(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Урок успешно удален!`);
          return new actions.DeleteOneLessonSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка удаления урока!`);
          return of(new actions.DeleteOneLessonFailed(error));
        })
      );
    })
  );

  @Effect()
  deleteLessons: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.DELETE_LESSONS),
    switchMap((action: any) => {
      return this.lessonsService.deleteLessons(action.payload.id).pipe(
        map(() => {
          this.toastr.success(`Уроки успешно удалены!`);
          return new actions.DeleteLessonsSuccess(action.payload);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка удаления уроков!`);
          return of(new actions.DeleteLessonsFailed(error));
        })
      );
    })
  );

  @Effect()
  updateOneLesson: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.UPDATE_ONE_LESSON),
    switchMap((action: any) => {
      return this.lessonsService.updateOneLesson(action.payload).pipe(
        map((lesson: LessonType) => {
          this.toastr.success(`Урок успешно изменен!`);
          return new actions.UpdateOneLessonSuccess(lesson);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка изменения урока!`);
          return of(new actions.UpdateOneLessonFailed(error));
        })
      );
    })
  );

  @Effect()
  updateLesson: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.UPDATE_LESSONS),
    switchMap((action: any) => {
      return this.lessonsService.updateLessons(action.payload).pipe(
        map((lesson: MultipleLessonType) => {
          this.toastr.success(`Уроки успешно изменены!`);
          return new actions.UpdateLessonsSuccess(lesson);
        }),
        catchError(error => {
          this.toastr.error(error.message, `Ошибка изменения уроков!`);
          return of(new actions.UpdateLessonsFailed(error));
        })
      );
    })
  );

  @Effect()
  getLesson: Observable<Actions | {}> = this.actions$.pipe(
    ofType(actions.LessonsActionType.GET_LESSON_BY_ID),
    switchMap((action: any) => {
      return this.lessonsService.getLessonById(action.payload).pipe(
        map((lesson: LessonType) => {
          return new actions.GetLessonByIdSuccess(lesson);
        }),
        catchError(error => of(new actions.GetLessonByIdFailed(error)))
      );
    })
  );

}
