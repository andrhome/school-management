import { Action } from '@ngrx/store';
import { GroupType } from '@app/types/common.types';

export const enum GroupActionType {
  GET_GROUPS = 'GET_GROUPS ',
  GET_GROUPS_SUCCESS = 'GET_GROUPS_SUCCESS',
  GET_GROUPS_FAILED = 'GET_GROUPS_FAILED',
  ADD_GROUP = 'ADD_GROUP',
  ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS',
  ADD_GROUP_FAILED = 'ADD_GROUP_FAILED',
  UPDATE_GROUP = 'UPDATE_GROUP',
  UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS',
  UPDATE_GROUP_FAILED = 'UPDATE_GROUP_FAILED',
  DELETE_GROUP = 'DELETE_GROUP',
  DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS',
  DELETE_GROUP_FAILED = 'DELETE_GROUP_FAILED',
  GET_GROUP_BY_ID = 'GET_GROUP_BY_ID',
  GET_GROUP_BY_ID_SUCCESS = 'GET_GROUP_BY_ID_SUCCESS',
  GET_GROUP_BY_ID_FAILED = 'DELETE_GROUP_BY_ID_FAILED',
  SET_GROUP = 'SET_GROUP'
}

export class GetGroups implements Action {
  readonly type = GroupActionType.GET_GROUPS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetGroupsSuccess implements Action {
  readonly type = GroupActionType.GET_GROUPS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetGroupsFailed implements Action {
  readonly type = GroupActionType.GET_GROUPS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddGroup implements Action {
  readonly type = GroupActionType.ADD_GROUP;

  constructor(public payload: GroupType) {
  }
}

export class AddGroupSuccess implements Action {
  readonly type = GroupActionType.ADD_GROUP_SUCCESS;

  constructor(public payload: GroupType) {
  }
}

export class AddGroupFailed implements Action {
  readonly type = GroupActionType.ADD_GROUP_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateGroup implements Action {
  readonly type = GroupActionType.UPDATE_GROUP;

  constructor(public payload: GroupType) {
  }
}

export class UpdateGroupSuccess implements Action {
  readonly type = GroupActionType.UPDATE_GROUP_SUCCESS;

  constructor(public payload: GroupType) {
  }
}

export class UpdateGroupFailed implements Action {
  readonly type = GroupActionType.UPDATE_GROUP_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteGroup implements Action {
  readonly type = GroupActionType.DELETE_GROUP;

  constructor(public payload: GroupType) {
  }
}

export class DeleteGroupSuccess implements Action {
  readonly type = GroupActionType.DELETE_GROUP_SUCCESS;

  constructor(public payload: GroupType) {
  }
}

export class DeleteGroupFailed implements Action {
  readonly type = GroupActionType.DELETE_GROUP_FAILED;

  constructor(public payload: string) {
  }
}

export class GetGroupById implements Action {
  readonly type = GroupActionType.GET_GROUP_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetGroupByIdSuccess implements Action {
  readonly type = GroupActionType.GET_GROUP_BY_ID_SUCCESS;

  constructor(public payload: GroupType) {
  }
}

export class GetGroupByIdFailed implements Action {
  readonly type = GroupActionType.GET_GROUP_BY_ID_FAILED;

  constructor(public payload: string) {
  }
}

export class SetGroup implements Action {
  readonly type = GroupActionType.SET_GROUP;

  constructor(public payload: GroupType) {
  }
}


export type GroupsActions =
  GetGroups |
  GetGroupsSuccess |
  GetGroupsFailed |
  AddGroup |
  AddGroupSuccess |
  AddGroupFailed |
  UpdateGroup |
  UpdateGroupSuccess |
  UpdateGroupFailed |
  DeleteGroup |
  DeleteGroupSuccess |
  DeleteGroupFailed |
  GetGroupById |
  GetGroupByIdSuccess |
  GetGroupByIdFailed |
  SetGroup;
