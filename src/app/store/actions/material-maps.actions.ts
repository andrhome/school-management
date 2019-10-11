import { Action } from '@ngrx/store';
import { MapMaterialsType } from '@app/types/common.types';

export const enum MaterialMapActionType {
  GET_MATERIAL_MAPS = 'GET_MATERIAL_MAPS ',
  GET_MATERIAL_MAPS_SUCCESS = 'GET_MATERIAL_MAPS_SUCCESS',
  GET_MATERIAL_MAPS_FAILED = 'GET_MATERIAL_MAPS_FAILED',
  ADD_MATERIAL_MAP = 'ADD_MATERIAL_MAP',
  ADD_MATERIAL_MAP_SUCCESS = 'ADD_MATERIAL_MAP_SUCCESS',
  ADD_MATERIAL_MAP_FAILED = 'ADD_MATERIAL_MAP_FAILED',
  UPDATE_MATERIAL_MAP = 'UPDATE_MATERIAL_MAP',
  UPDATE_MATERIAL_MAP_SUCCESS = 'UPDATE_MATERIAL_MAP_SUCCESS',
  UPDATE_MATERIAL_MAP_FAILED = 'UPDATE_MATERIAL_MAP_FAILED',
  DELETE_MATERIAL_MAP = 'DELETE_MATERIAL_MAP',
  DELETE_MATERIAL_MAP_SUCCESS = 'DELETE_MATERIAL_MAP_SUCCESS',
  DELETE_MATERIAL_MAP_FAILED = 'DELETE_MATERIAL_MAP_FAILED',
  GET_MATERIAL_MAP = 'GET_MATERIAL_MAP',
  GET_MATERIAL_MAP_SUCCESS = 'GET_MATERIAL_MAP_SUCCESS',
  GET_MATERIAL_MAP_FAILED = 'DELETE_MATERIAL_MAP_FAILED'
}

export class GetMaterialMaps implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAPS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetMaterialMapsSuccess implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAPS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetMaterialMapsFailed implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAPS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddMaterialMap implements Action {
  readonly type = MaterialMapActionType.ADD_MATERIAL_MAP;

  constructor(public payload: MapMaterialsType) {
  }
}

export class AddMaterialMapSuccess implements Action {
  readonly type = MaterialMapActionType.ADD_MATERIAL_MAP_SUCCESS;

  constructor(public payload: MapMaterialsType) {
  }
}

export class AddMaterialMapFailed implements Action {
  readonly type = MaterialMapActionType.ADD_MATERIAL_MAP_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateMaterialMap implements Action {
  readonly type = MaterialMapActionType.UPDATE_MATERIAL_MAP;

  constructor(public payload: MapMaterialsType) {
  }
}

export class UpdateMaterialMapSuccess implements Action {
  readonly type = MaterialMapActionType.UPDATE_MATERIAL_MAP_SUCCESS;

  constructor(public payload: MapMaterialsType) {
  }
}

export class UpdateMaterialMapFailed implements Action {
  readonly type = MaterialMapActionType.UPDATE_MATERIAL_MAP_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteMaterialMap implements Action {
  readonly type = MaterialMapActionType.DELETE_MATERIAL_MAP;

  constructor(public payload: MapMaterialsType) {
  }
}

export class DeleteMaterialMapSuccess implements Action {
  readonly type = MaterialMapActionType.DELETE_MATERIAL_MAP_SUCCESS;

  constructor(public payload: number) {
  }
}

export class DeleteMaterialMapFailed implements Action {
  readonly type = MaterialMapActionType.DELETE_MATERIAL_MAP_FAILED;

  constructor(public payload: string) {
  }
}

export class GetMaterialMap implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAP;

  constructor(public payload: number) {
  }
}

export class GetMaterialMapSuccess implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAP_SUCCESS;

  constructor(public payload: MapMaterialsType) {
  }
}

export class GetMaterialMapFailed implements Action {
  readonly type = MaterialMapActionType.GET_MATERIAL_MAP_FAILED;

  constructor(public payload: string) {
  }
}


export type MaterialMapsActions =
  GetMaterialMaps |
  GetMaterialMapsSuccess |
  GetMaterialMapsFailed |
  AddMaterialMap |
  AddMaterialMapSuccess |
  AddMaterialMapFailed |
  UpdateMaterialMap |
  UpdateMaterialMapSuccess |
  UpdateMaterialMapFailed |
  DeleteMaterialMap |
  DeleteMaterialMapSuccess |
  DeleteMaterialMapFailed |
  GetMaterialMap |
  GetMaterialMapSuccess |
  GetMaterialMapFailed;
