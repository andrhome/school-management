import { Action } from '@ngrx/store';
import { UserType } from '@app/types/common.types';

export const enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  GET_ME = 'GET_ME',
  GET_ME_SUCCESS = 'GET_ME_SUCCESS',
  GET_ME_FAILED = 'GET_ME_FAILED',
  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
}

export class Login implements Action {
  readonly type = AuthActionType.LOGIN;

  constructor(public payload: {[key: string]: any}) {
  }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionType.LOGIN_SUCCESS;

  constructor() {
  }
}

export class LoginFailed implements Action {
  readonly type = AuthActionType.LOGIN_FAILED;

  constructor(public payload: string) {
  }
}

export class GetMe implements Action {
  readonly type = AuthActionType.GET_ME;

  constructor() {
  }
}

export class GetMeSuccess implements Action {
  readonly type = AuthActionType.GET_ME_SUCCESS;

  constructor(public payload: UserType) {
  }
}

export class GetMeFailed implements Action {
  readonly type = AuthActionType.GET_ME_FAILED;

  constructor(public payload: string) {
  }
}

export class Logout implements Action {
  readonly type = AuthActionType.LOGOUT;

  constructor() {
  }
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionType.LOGOUT_SUCCESS;

  constructor() {
  }
}

export type AuthActions =
  Login |
  LoginSuccess |
  LoginFailed |
  GetMe |
  GetMeSuccess |
  GetMeFailed |
  Logout |
  LogoutSuccess;
