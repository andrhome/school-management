import { Action } from '@ngrx/store';
import { LessonType, MultipleLessonType } from '@app/types/common.types';

export const enum LessonsActionType {
  GET_LESSONS = 'GET_LESSONS',
  GET_LESSONS_SUCCESS = 'GET_LESSONS_SUCCESS',
  GET_LESSONS_FAILED = 'GET_LESSONS_FAILED',
  ADD_LESSON = 'ADD_LESSON',
  ADD_LESSON_SUCCESS = 'ADD_LESSON_SUCCESS',
  ADD_LESSON_FAILED = 'ADD_LESSON_FAILED',
  UPDATE_ONE_LESSON = 'UPDATE_ONE_LESSON',
  UPDATE_ONE_LESSON_SUCCESS = 'UPDATE_ONE_LESSON_SUCCESS',
  UPDATE_ONE_LESSON_FAILED = 'UPDATE_ONE_LESSON_FAILED',
  UPDATE_LESSONS = 'UPDATE_LESSONS',
  UPDATE_LESSONS_SUCCESS = 'UPDATE_LESSONS_SUCCESS',
  UPDATE_LESSONS_FAILED = 'UPDATE_LESSONS_FAILED',
  DELETE_ONE_LESSON = 'DELETE_ONE_LESSON',
  DELETE_ONE_LESSON_SUCCESS = 'DELETE_ONE_LESSON_SUCCESS',
  DELETE_ONE_LESSON_FAILED = 'DELETE_ONE_LESSON_FAILED',
  DELETE_LESSONS = 'DELETE_LESSONS',
  DELETE_LESSONS_SUCCESS = 'DELETE_LESSONS_SUCCESS',
  DELETE_LESSONS_FAILED = 'DELETE_LESSONS_FAILED',
  GET_LESSON_BY_ID = 'GET_LESSON_BY_ID',
  GET_LESSON_BY_ID_SUCCESS = 'GET_LESSON_BY_ID_SUCCESS',
  GET_LESSON_BY_ID_FAILED = 'GET_LESSON_BY_ID_FAILED'
}

export class GetLessons implements Action {
  readonly type = LessonsActionType.GET_LESSONS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetLessonsSuccess implements Action {
  readonly type = LessonsActionType.GET_LESSONS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetLessonsFailed implements Action {
  readonly type = LessonsActionType.GET_LESSONS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddLesson implements Action {
  readonly type = LessonsActionType.ADD_LESSON;

  constructor(public payload: MultipleLessonType | LessonType) {
  }
}

export class AddLessonSuccess implements Action {
  readonly type = LessonsActionType.ADD_LESSON_SUCCESS;

  constructor(public payload: LessonType) {
  }
}

export class AddLessonFailed implements Action {
  readonly type = LessonsActionType.ADD_LESSON_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateOneLesson implements Action {
  readonly type = LessonsActionType.UPDATE_ONE_LESSON;

  constructor(public payload: LessonType) {
  }
}

export class UpdateOneLessonSuccess implements Action {
  readonly type = LessonsActionType.UPDATE_ONE_LESSON_SUCCESS;

  constructor(public payload: LessonType) {
  }
}

export class UpdateOneLessonFailed implements Action {
  readonly type = LessonsActionType.UPDATE_ONE_LESSON_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateLessons implements Action {
  readonly type = LessonsActionType.UPDATE_LESSONS;

  constructor(public payload: MultipleLessonType) {
  }
}

export class UpdateLessonsSuccess implements Action {
  readonly type = LessonsActionType.UPDATE_LESSONS_SUCCESS;

  constructor(public payload: MultipleLessonType) {
  }
}

export class UpdateLessonsFailed implements Action {
  readonly type = LessonsActionType.UPDATE_LESSONS_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteOneLesson implements Action {
  readonly type = LessonsActionType.DELETE_ONE_LESSON;

  constructor(public payload: LessonType) {
  }
}

export class DeleteOneLessonSuccess implements Action {
  readonly type = LessonsActionType.DELETE_ONE_LESSON_SUCCESS;

  constructor(public payload: LessonType) {
  }
}

export class DeleteOneLessonFailed implements Action {
  readonly type = LessonsActionType.DELETE_ONE_LESSON_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteLessons implements Action {
  readonly type = LessonsActionType.DELETE_LESSONS;

  constructor(public payload: MultipleLessonType) {
  }
}

export class DeleteLessonsSuccess implements Action {
  readonly type = LessonsActionType.DELETE_LESSONS_SUCCESS;

  constructor(public payload: MultipleLessonType) {
  }
}

export class DeleteLessonsFailed implements Action {
  readonly type = LessonsActionType.DELETE_LESSONS_FAILED;

  constructor(public payload: string) {
  }
}

export class GetLessonById implements Action {
  readonly type = LessonsActionType.GET_LESSON_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetLessonByIdSuccess implements Action {
  readonly type = LessonsActionType.GET_LESSON_BY_ID_SUCCESS;

  constructor(public payload: LessonType) {
  }
}

export class GetLessonByIdFailed implements Action {
  readonly type = LessonsActionType.GET_LESSON_BY_ID_FAILED;

  constructor(public payload: string) {
  }
}

export type LessonsActions =
  GetLessons |
  GetLessonsSuccess |
  GetLessonsFailed |
  AddLesson |
  AddLessonSuccess |
  AddLessonFailed |
  UpdateOneLesson |
  UpdateOneLessonSuccess |
  UpdateOneLessonFailed |
  UpdateLessons |
  UpdateLessonsSuccess |
  UpdateLessonsFailed |
  DeleteOneLesson |
  DeleteOneLessonSuccess |
  DeleteOneLessonFailed |
  DeleteLessons |
  DeleteLessonsSuccess |
  DeleteLessonsFailed |
  GetLessonById |
  GetLessonByIdSuccess |
  GetLessonByIdFailed;
