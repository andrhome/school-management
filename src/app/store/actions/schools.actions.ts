import { Action } from '@ngrx/store';
import { SchoolType } from '@app/types/common.types';

export const enum SchoolActionType {
  GET_SCHOOLS = 'GET_SCHOOLS ',
  GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS',
  GET_SCHOOLS_FAILED = 'GET_SCHOOLS_FAILED',
  ADD_SCHOOL = 'ADD_SCHOOL',
  ADD_SCHOOL_SUCCESS = 'ADD_SCHOOL_SUCCESS',
  ADD_SCHOOL_FAILED = 'ADD_SCHOOL_FAILED',
  UPDATE_SCHOOL = 'UPDATE_SCHOOL',
  UPDATE_SCHOOL_SUCCESS = 'UPDATE_SCHOOL_SUCCESS',
  UPDATE_SCHOOL_FAILED = 'UPDATE_SCHOOL_FAILED',
  DELETE_SCHOOL = 'DELETE_SCHOOL',
  DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS',
  DELETE_SCHOOL_FAILED = 'DELETE_SCHOOL_FAILED',
  GET_SCHOOL_BY_ID = 'GET_SCHOOL_BY_ID',
  GET_SCHOOL_BY_ID_SUCCESS = 'GET_SCHOOL_BY_ID_SUCCESS',
  GET_SCHOOL_BY_ID_FAILED = 'GET_SCHOOL_BY_ID_FAILED'
}

export class GetSchools implements Action {
  readonly type = SchoolActionType.GET_SCHOOLS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSchoolsSuccess implements Action {
  readonly type = SchoolActionType.GET_SCHOOLS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSchoolsFailed implements Action {
  readonly type = SchoolActionType.GET_SCHOOLS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddSchool implements Action {
  readonly type = SchoolActionType.ADD_SCHOOL;

  constructor(public payload: SchoolType) {
  }
}

export class AddSchoolSuccess implements Action {
  readonly type = SchoolActionType.ADD_SCHOOL_SUCCESS;

  constructor(public payload: SchoolType) {
  }
}

export class AddSchoolFailed implements Action {
  readonly type = SchoolActionType.ADD_SCHOOL_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateSchool implements Action {
  readonly type = SchoolActionType.UPDATE_SCHOOL;

  constructor(public payload: SchoolType) {
  }
}

export class UpdateSchoolSuccess implements Action {
  readonly type = SchoolActionType.UPDATE_SCHOOL_SUCCESS;

  constructor(public payload: SchoolType) {
  }
}

export class UpdateSchoolFailed implements Action {
  readonly type = SchoolActionType.UPDATE_SCHOOL_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteSchool implements Action {
  readonly type = SchoolActionType.DELETE_SCHOOL;

  constructor(public payload: SchoolType) {
  }
}

export class DeleteSchoolSuccess implements Action {
  readonly type = SchoolActionType.DELETE_SCHOOL_SUCCESS;

  constructor(public payload: SchoolType) {
  }
}

export class DeleteSchoolFailed implements Action {
  readonly type = SchoolActionType.DELETE_SCHOOL_FAILED;

  constructor(public payload: string) {
  }
}

export class GetSchoolById implements Action {
  readonly type = SchoolActionType.GET_SCHOOL_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetSchoolByIdSuccess implements Action {
  readonly type = SchoolActionType.GET_SCHOOL_BY_ID_SUCCESS;

  constructor(public payload: SchoolType) {
  }
}

export class GetSchoolByIdFailed implements Action {
  readonly type = SchoolActionType.GET_SCHOOL_BY_ID_FAILED;

  constructor(public payload: string) {
  }
}


export type SchoolsActions =
  GetSchools |
  GetSchoolsSuccess |
  GetSchoolsFailed |
  AddSchool |
  AddSchoolSuccess |
  AddSchoolFailed |
  UpdateSchool |
  UpdateSchoolSuccess |
  UpdateSchoolFailed |
  DeleteSchool |
  DeleteSchoolSuccess |
  DeleteSchoolFailed |
  GetSchoolById |
  GetSchoolByIdSuccess |
  GetSchoolByIdFailed;
