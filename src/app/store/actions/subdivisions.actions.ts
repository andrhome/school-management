import { Action } from '@ngrx/store';
import { SubdivisionType } from '@app/types/common.types';

export const enum SubdivisionActionType {
  GET_SUBDIVISIONS = 'GET_SUBDIVISIONS ',
  GET_SUBDIVISIONS_SUCCESS = 'GET_SUBDIVISIONS_SUCCESS',
  GET_SUBDIVISIONS_FAILED = 'GET_SUBDIVISIONS_FAILED',
  ADD_SUBDIVISION = 'ADD_SUBDIVISION',
  ADD_SUBDIVISION_SUCCESS = 'ADD_SUBDIVISION_SUCCESS',
  ADD_SUBDIVISION_FAILED = 'ADD_SUBDIVISION_FAILED',
  UPDATE_SUBDIVISION = 'UPDATE_SUBDIVISION',
  UPDATE_SUBDIVISION_SUCCESS = 'UPDATE_SUBDIVISION_SUCCESS',
  UPDATE_SUBDIVISION_FAILED = 'UPDATE_SUBDIVISION_FAILED',
  DELETE_SUBDIVISION = 'DELETE_SUBDIVISIONS',
  DELETE_SUBDIVISION_SUCCESS = 'DELETE_SUBDIVISION_SUCCESS',
  DELETE_SUBDIVISION_FAILED = 'DELETE_SUBDIVISION_FAILED',
  GET_SUBDIVISION = 'GET_SUBDIVISION',
  GET_SUBDIVISION_SUCCESS = 'GET_SUBDIVISION_SUCCESS',
  GET_SUBDIVISION_FAILED = 'DELETE_SUBDIVISION_FAILED'
}

export class GetSubdivisions implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISIONS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSubdivisionsSuccess implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISIONS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetSubdivisionsFailed implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISIONS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddSubdivision implements Action {
  readonly type = SubdivisionActionType.ADD_SUBDIVISION;

  constructor(public payload: SubdivisionType) {
  }
}

export class AddSubdivisionSuccess implements Action {
  readonly type = SubdivisionActionType.ADD_SUBDIVISION_SUCCESS;

  constructor(public payload: SubdivisionType) {
  }
}

export class AddSubdivisionFailed implements Action {
  readonly type = SubdivisionActionType.ADD_SUBDIVISION_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateSubdivision implements Action {
  readonly type = SubdivisionActionType.UPDATE_SUBDIVISION;

  constructor(public payload: SubdivisionType) {
  }
}

export class UpdateSubdivisionSuccess implements Action {
  readonly type = SubdivisionActionType.UPDATE_SUBDIVISION_SUCCESS;

  constructor(public payload: SubdivisionType) {
  }
}

export class UpdateSubdivisionFailed implements Action {
  readonly type = SubdivisionActionType.UPDATE_SUBDIVISION_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteSubdivision implements Action {
  readonly type = SubdivisionActionType.DELETE_SUBDIVISION;

  constructor(public payload: SubdivisionType) {
  }
}

export class DeleteSubdivisionSuccess implements Action {
  readonly type = SubdivisionActionType.DELETE_SUBDIVISION_SUCCESS;

  constructor(public payload: SubdivisionType) {
  }
}

export class DeleteSubdivisionFailed implements Action {
  readonly type = SubdivisionActionType.DELETE_SUBDIVISION_FAILED;

  constructor(public payload: string) {
  }
}

export class GetSubdivision implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISION;

  constructor(public payload: number) {
  }
}

export class GetSubdivisionSuccess implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISION_SUCCESS;

  constructor(public payload: SubdivisionType) {
  }
}

export class GetSubdivisionFailed implements Action {
  readonly type = SubdivisionActionType.GET_SUBDIVISION_FAILED;

  constructor(public payload: string) {
  }
}


export type SubdivisionsActions =
  GetSubdivisions |
  GetSubdivisionsSuccess |
  GetSubdivisionsFailed |
  AddSubdivision |
  AddSubdivisionSuccess |
  AddSubdivisionFailed |
  UpdateSubdivision |
  UpdateSubdivisionSuccess |
  UpdateSubdivisionFailed |
  DeleteSubdivision |
  DeleteSubdivisionSuccess |
  DeleteSubdivisionFailed |
  GetSubdivision |
  GetSubdivisionSuccess |
  GetSubdivisionFailed;
