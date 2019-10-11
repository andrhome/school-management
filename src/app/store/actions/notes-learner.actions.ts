import { Action } from '@ngrx/store';
import { NoteLearnerType } from '@app/types/common.types';

export const enum NoteLearnerActionType {
  GET_NOTES_LEARNER = 'GET_NOTES_LEARNER',
  GET_NOTES_LEARNER_SUCCESS = 'GET_NOTES_LEARNER_SUCCESS',
  GET_NOTES_LEARNER_FAILED = 'GET_NOTES_LEARNER_FAILED',
  ADD_NOTE_LEARNER = 'ADD_NOTE_LEARNER',
  ADD_NOTE_LEARNER_SUCCESS = 'ADD_NOTE_LEARNER_SUCCESS',
  ADD_NOTE_LEARNER_FAILED = 'ADD_NOTE_LEARNER_FAILED',
  UPDATE_NOTE_LEARNER = 'UPDATE_NOTE_LEARNER',
  UPDATE_NOTE_LEARNER_SUCCESS = 'UPDATE_NOTE_LEARNER_SUCCESS',
  UPDATE_NOTE_LEARNER_FAILED = 'UPDATE_NOTE_LEARNER_FAILED',
  DELETE_NOTE_LEARNER = 'DELETE_NOTE_LEARNER',
  DELETE_NOTE_LEARNER_SUCCESS = 'DELETE_NOTE_LEARNER_SUCCESS',
  DELETE_NOTE_LEARNER_FAILED = 'DELETE_NOTE_LEARNER_FAILED',
  GET_NOTE_LEARNER_BY_ID = 'GET_NOTE_LEARNER_BY_ID',
  GET_NOTE_LEARNER_BY_ID_SUCCESS = 'GET_NOTE_LEARNER_BY_ID_SUCCESS',
  GET_NOTE_LEARNER_BY_ID_FAILED = 'GET_NOTE_LEARNER_BY_ID_FAILED',
  SELECT_NOTE_LEARNER = 'SELECT_NOTE_LEARNER'
}

export class GetNotesLearner implements Action {
  readonly type = NoteLearnerActionType.GET_NOTES_LEARNER;

  constructor(public payload?: {[key: string]: any}) {
  }
}

export class GetNotesLearnerSuccess implements Action {
  readonly type = NoteLearnerActionType.GET_NOTES_LEARNER_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetNotesLearnerFailed implements Action {
  readonly type = NoteLearnerActionType.GET_NOTES_LEARNER_FAILED;

  constructor(public payload: string) {
  }
}

export class AddNoteLearner implements Action {
  readonly type = NoteLearnerActionType.ADD_NOTE_LEARNER;

  constructor(public payload: NoteLearnerType) {
  }
}

export class AddNoteLearnerSuccess implements Action {
  readonly type = NoteLearnerActionType.ADD_NOTE_LEARNER_SUCCESS;

  constructor(public payload: NoteLearnerType) {
  }
}

export class AddNoteLearnerFailed implements Action {
  readonly type = NoteLearnerActionType.ADD_NOTE_LEARNER_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateNoteLearner implements Action {
  readonly type = NoteLearnerActionType.UPDATE_NOTE_LEARNER;

  constructor(public payload: NoteLearnerType) {
  }
}

export class UpdateNoteLearnerSuccess implements Action {
  readonly type = NoteLearnerActionType.UPDATE_NOTE_LEARNER_SUCCESS;

  constructor(public payload: NoteLearnerType) {
  }
}

export class UpdateNoteLearnerFailed implements Action {
  readonly type = NoteLearnerActionType.UPDATE_NOTE_LEARNER_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteNoteLearner implements Action {
  readonly type = NoteLearnerActionType.DELETE_NOTE_LEARNER;

  constructor(public payload: NoteLearnerType) {
  }
}

export class DeleteNoteLearnerSuccess implements Action {
  readonly type = NoteLearnerActionType.DELETE_NOTE_LEARNER_SUCCESS;

  constructor(public payload: NoteLearnerType) {
  }
}

export class DeleteNoteLearnerFailed implements Action {
  readonly type = NoteLearnerActionType.DELETE_NOTE_LEARNER_FAILED;

  constructor(public payload: string) {
  }
}

export class GetNoteLearnerById implements Action {
  readonly type = NoteLearnerActionType.GET_NOTE_LEARNER_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetNoteLearnerByIdSuccess implements Action {
  readonly type = NoteLearnerActionType.GET_NOTE_LEARNER_BY_ID_SUCCESS;

  constructor(public payload: NoteLearnerType) {
  }
}

export class GetNoteLearnerByIdFailed implements Action {
  readonly type = NoteLearnerActionType.GET_NOTE_LEARNER_BY_ID_FAILED;

  constructor(public payload: number) {
  }
}

export class SelectNoteLearner implements Action {
  readonly type = NoteLearnerActionType.SELECT_NOTE_LEARNER;

  constructor(public payload: NoteLearnerType | {[key: string]: any}) {
  }
}


export type NotesLearnerActions =
  GetNotesLearner |
  GetNotesLearnerSuccess |
  GetNotesLearnerFailed |
  AddNoteLearner |
  AddNoteLearnerSuccess |
  AddNoteLearnerFailed |
  UpdateNoteLearner |
  UpdateNoteLearnerSuccess |
  UpdateNoteLearnerFailed |
  DeleteNoteLearner |
  DeleteNoteLearnerSuccess |
  DeleteNoteLearnerFailed |
  GetNoteLearnerById |
  GetNoteLearnerByIdSuccess |
  GetNoteLearnerByIdFailed |
  SelectNoteLearner;
