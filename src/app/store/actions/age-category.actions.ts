import { Action } from '@ngrx/store';
import { AgeCategoryType } from '@app/types/common.types';

export const enum AgeCategoryActionType {
  GET_AGECATEGORIES = 'GET_AGECATEGORIES ',
  GET_AGECATEGORIES_SUCCESS = 'GET_AGECATEGORIES_SUCCESS',
  GET_AGECATEGORIES_FAILED = 'GET_AGECATEGORIES_FAILED',
  ADD_AGECATEGORY = 'ADD_AGECATEGORY',
  ADD_AGECATEGORY_SUCCESS = 'ADD_AGECATEGORY_SUCCESS',
  ADD_AGECATEGORY_FAILED = 'ADD_AGECATEGORY_FAILED',
  UPDATE_AGECATEGORY = 'UPDATE_AGECATEGORY',
  UPDATE_AGECATEGORY_SUCCESS = 'UPDATE_AGECATEGORY_SUCCESS',
  UPDATE_AGECATEGORY_FAILED = 'UPDATE_AGECATEGORY_FAILED',
  DELETE_AGECATEGORY = 'DELETE_AGECATEGORY',
  DELETE_AGECATEGORY_SUCCESS = 'DELETE_AGECATEGORY_SUCCESS',
  DELETE_AGECATEGORY_FAILED = 'DELETE_AGECATEGORY_FAILED',
  GET_AGECATEGORY = 'GET_AGECATEGORY',
  GET_AGECATEGORY_SUCCESS = 'GET_AGECATEGORY_SUCCESS',
  GET_AGECATEGORY_FAILED = 'GET_AGECATEGORY_FAILED',
  SET_AGECATEGORY = 'SET_AGECATEGORY',
}

export class GetAgeCategories implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORIES;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetAgeCategoriesSuccess implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORIES_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetAgeCategoriesFailed implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORIES_FAILED;

  constructor(public payload: string) {
  }
}

export class AddAgeCategory implements Action {
  readonly type = AgeCategoryActionType.ADD_AGECATEGORY;

  constructor(public payload: AgeCategoryType) {
  }
}

export class AddAgeCategorySuccess implements Action {
  readonly type = AgeCategoryActionType.ADD_AGECATEGORY_SUCCESS;

  constructor(public payload: AgeCategoryType) {
  }
}

export class AddAgeCategoryFailed implements Action {
  readonly type = AgeCategoryActionType.ADD_AGECATEGORY_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateAgeCategory implements Action {
  readonly type = AgeCategoryActionType.UPDATE_AGECATEGORY;

  constructor(public payload: AgeCategoryType) {
  }
}

export class UpdateAgeCategorySuccess implements Action {
  readonly type = AgeCategoryActionType.UPDATE_AGECATEGORY_SUCCESS;

  constructor(public payload: AgeCategoryType) {
  }
}

export class UpdateAgeCategoryFailed implements Action {
  readonly type = AgeCategoryActionType.UPDATE_AGECATEGORY_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteAgeCategory implements Action {
  readonly type = AgeCategoryActionType.DELETE_AGECATEGORY;

  constructor(public payload: AgeCategoryType) {
  }
}

export class DeleteAgeCategorySuccess implements Action {
  readonly type = AgeCategoryActionType.DELETE_AGECATEGORY_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteAgeCategoryFailed implements Action {
  readonly type = AgeCategoryActionType.DELETE_AGECATEGORY_FAILED;

  constructor(public payload: string) {
  }
}

export class GetAgeCategory implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORY;

  constructor(public payload: number) {
  }
}

export class GetAgeCategorySuccess implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORY_SUCCESS;

  constructor(public payload: AgeCategoryType) {
  }
}

export class GetAgeCategoryFailed implements Action {
  readonly type = AgeCategoryActionType.GET_AGECATEGORY_FAILED;

  constructor(public payload: string) {
  }
}

export class SetAgeCategory implements Action {
  readonly type = AgeCategoryActionType.SET_AGECATEGORY;

  constructor(public payload: AgeCategoryType) {
  }
}

export type AgeCategoriesActions =
  GetAgeCategories |
  GetAgeCategoriesSuccess |
  GetAgeCategoriesFailed |
  AddAgeCategory |
  AddAgeCategorySuccess |
  AddAgeCategoryFailed |
  UpdateAgeCategory |
  UpdateAgeCategorySuccess |
  UpdateAgeCategoryFailed |
  DeleteAgeCategory |
  DeleteAgeCategorySuccess |
  DeleteAgeCategoryFailed |
  GetAgeCategory |
  GetAgeCategorySuccess |
  GetAgeCategoryFailed |
  SetAgeCategory;
