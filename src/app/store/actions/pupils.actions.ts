import { Action } from '@ngrx/store';
import { PupilType } from '@app/types/common.types';

export const enum PupilActionType {
  GET_PUPILS = 'GET_PUPILS',
  GET_PUPILS_SUCCESS = 'GET_PUPILS_SUCCESS',
  GET_PUPILS_FAILED = 'GET_PUPILS_FAILED',
  ADD_PUPIL = 'ADD_PUPIL',
  ADD_PUPIL_SUCCESS = 'ADD_PUPIL_SUCCESS',
  ADD_PUPIL_FAILED = 'ADD_PUPIL_FAILED',
  UPDATE_PUPIL = 'UPDATE_PUPIL',
  UPDATE_PUPIL_SUCCESS = 'UPDATE_PUPIL_SUCCESS',
  UPDATE_PUPIL_FAILED = 'UPDATE_PUPIL_FAILED',
  DELETE_PUPIL = 'DELETE_PUPIL',
  DELETE_PUPIL_SUCCESS = 'DELETE_PUPIL_SUCCESS',
  DELETE_PUPIL_FAILED = 'DELETE_PUPIL_FAILED',
  GET_PUPIL_BY_ID = 'GET_PUPIL_BY_ID',
  GET_PUPIL_BY_ID_SUCCESS = 'GET_PUPIL_BY_ID_SUCCESS',
  GET_PUPIL_BY_ID_FAILED = 'GET_PUPIL_BY_ID_FAILED',
  SET_PUPIL = 'SET_PUPIL'
}

export class GetPupils implements Action {
  readonly type = PupilActionType.GET_PUPILS;

  constructor(public payload?: {[key: string]: any}) {
  }
}

export class GetPupilsSuccess implements Action {
  readonly type = PupilActionType.GET_PUPILS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetPupilsFailed implements Action {
  readonly type = PupilActionType.GET_PUPILS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddPupil implements Action {
  readonly type = PupilActionType.ADD_PUPIL;

  constructor(public payload: PupilType) {
  }
}

export class AddPupilSuccess implements Action {
  readonly type = PupilActionType.ADD_PUPIL_SUCCESS;

  constructor(public payload: PupilType) {
  }
}

export class AddPupilFailed implements Action {
  readonly type = PupilActionType.ADD_PUPIL_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdatePupil implements Action {
  readonly type = PupilActionType.UPDATE_PUPIL;

  constructor(public payload: PupilType) {
  }
}

export class UpdatePupilSuccess implements Action {
  readonly type = PupilActionType.UPDATE_PUPIL_SUCCESS;

  constructor(public payload: PupilType) {
  }
}

export class UpdatePupilFailed implements Action {
  readonly type = PupilActionType.UPDATE_PUPIL_FAILED;

  constructor(public payload: string) {
  }
}

export class DeletePupil implements Action {
  readonly type = PupilActionType.DELETE_PUPIL;

  constructor(public payload: PupilType) {
  }
}

export class DeletePupilSuccess implements Action {
  readonly type = PupilActionType.DELETE_PUPIL_SUCCESS;

  constructor(public payload: PupilType) {
  }
}

export class DeletePupilFailed implements Action {
  readonly type = PupilActionType.DELETE_PUPIL_FAILED;

  constructor(public payload: string) {
  }
}

export class GetPupilById implements Action {
  readonly type = PupilActionType.GET_PUPIL_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetPupilByIdSuccess implements Action {
  readonly type = PupilActionType.GET_PUPIL_BY_ID_SUCCESS;

  constructor(public payload: PupilType) {
  }
}

export class GetPupilByIdFailed implements Action {
  readonly type = PupilActionType.GET_PUPIL_BY_ID_FAILED;

  constructor(public payload: number) {
  }
}

export class SetPupil implements Action {
  readonly type = PupilActionType.SET_PUPIL;

  constructor(public payload: PupilType | null) {
  }
}


export type PupilsActions =
  GetPupils |
  GetPupilsSuccess |
  GetPupilsFailed |
  AddPupil |
  AddPupilSuccess |
  AddPupilFailed |
  UpdatePupil |
  UpdatePupilSuccess |
  UpdatePupilFailed |
  DeletePupil |
  DeletePupilSuccess |
  DeletePupilFailed |
  GetPupilById |
  GetPupilByIdSuccess |
  GetPupilByIdFailed |
  SetPupil;
