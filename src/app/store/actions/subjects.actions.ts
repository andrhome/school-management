import { Action } from '@ngrx/store';
import { SubjectType } from '@app/types/common.types';

export const enum SubjectActionType {
  GET_SUBJECTS = 'GET_SUBJECTS ',
  GET_SUBJECTS_SUCCESS = 'GET_SUBJECTS_SUCCESS',
  GET_SUBJECTS_FAILED = 'GET_SUBJECTS_FAILED',
  ADD_SUBJECT = 'ADD_SUBJECT',
  ADD_SUBJECT_SUCCESS = 'ADD_SUBJECT_SUCCESS',
  ADD_SUBJECT_FAILED = 'ADD_SUBJECT_FAILED',
  UPDATE_SUBJECT = 'UPDATE_SUBJECT',
  UPDATE_SUBJECT_SUCCESS = 'UPDATE_SUBJECT_SUCCESS',
  UPDATE_SUBJECT_FAILED = 'UPDATE_SUBJECT_FAILED',
  DELETE_SUBJECT = 'DELETE_SUBJECT',
  DELETE_SUBJECT_SUCCESS = 'DELETE_SUBJECT_SUCCESS',
  DELETE_SUBJECT_FAILED = 'DELETE_SUBJECT_FAILED',
  GET_SUBJECT = 'GET__SUBJECT',
  GET_SUBJECT_SUCCESS = 'GET_SUBJECT_SUCCESS',
  GET_SUBJECT_FAILED = 'DELETE_SUBJECT_FAILED',
  SET_SUBJECT = 'SET__SUBJECT'
}

export class GetSubjects implements Action {
  readonly type = SubjectActionType.GET_SUBJECTS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSubjectsSuccess implements Action {
  readonly type = SubjectActionType.GET_SUBJECTS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSubjectsFailed implements Action {
  readonly type = SubjectActionType.GET_SUBJECTS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddSubject implements Action {
  readonly type = SubjectActionType.ADD_SUBJECT;

  constructor(public payload: SubjectType) {
  }
}

export class AddSubjectSuccess implements Action {
  readonly type = SubjectActionType.ADD_SUBJECT_SUCCESS;

  constructor(public payload: SubjectType) {
  }
}

export class AddSubjectFailed implements Action {
  readonly type = SubjectActionType.ADD_SUBJECT_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateSubject implements Action {
  readonly type = SubjectActionType.UPDATE_SUBJECT;

  constructor(public payload: SubjectType) {
  }
}

export class UpdateSubjectSuccess implements Action {
  readonly type = SubjectActionType.UPDATE_SUBJECT_SUCCESS;

  constructor(public payload: SubjectType) {
  }
}

export class UpdateSubjectFailed implements Action {
  readonly type = SubjectActionType.UPDATE_SUBJECT_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteSubject implements Action {
  readonly type = SubjectActionType.DELETE_SUBJECT;

  constructor(public payload: SubjectType) {
  }
}

export class DeleteSubjectSuccess implements Action {
  readonly type = SubjectActionType.DELETE_SUBJECT_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteSubjectFailed implements Action {
  readonly type = SubjectActionType.DELETE_SUBJECT_FAILED;

  constructor(public payload: string) {
  }
}

export class GetSubject implements Action {
  readonly type = SubjectActionType.GET_SUBJECT;

  constructor(public payload: number) {
  }
}

export class GetSubjectSuccess implements Action {
  readonly type = SubjectActionType.GET_SUBJECT_SUCCESS;

  constructor(public payload: SubjectType) {
  }
}

export class GetSubjectFailed implements Action {
  readonly type = SubjectActionType.GET_SUBJECT_FAILED;

  constructor(public payload: string) {
  }
}

export class SetSubject implements Action {
  readonly type = SubjectActionType.SET_SUBJECT;

  constructor(public payload: SubjectType) {
  }
}

export type SubjectsActions =
  GetSubjects |
  GetSubjectsSuccess |
  GetSubjectsFailed |
  AddSubject |
  AddSubjectSuccess |
  AddSubjectFailed |
  UpdateSubject |
  UpdateSubjectSuccess |
  UpdateSubjectFailed |
  DeleteSubject |
  DeleteSubjectSuccess |
  DeleteSubjectFailed |
  GetSubject |
  GetSubjectSuccess |
  GetSubjectFailed |
  SetSubject;
