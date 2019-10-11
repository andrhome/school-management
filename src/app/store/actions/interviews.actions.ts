import { Action } from '@ngrx/store';
import { InterviewType } from '@app/types/common.types';

export const enum InterviewActionType {
  GET_INTERVIEWS = 'GET_INTERVIEWS',
  GET_INTERVIEWS_SUCCESS = 'GET_INTERVIEWS_SUCCESS',
  GET_INTERVIEWS_FAILED = 'GET_INTERVIEWS_FAILED',
  ADD_INTERVIEW = 'ADD_INTERVIEW',
  ADD_INTERVIEW_SUCCESS = 'ADD_INTERVIEW_SUCCESS',
  ADD_INTERVIEW_FAILED = 'ADD_INTERVIEW_FAILED',
  UPDATE_INTERVIEW = 'UPDATE_INTERVIEW',
  UPDATE_INTERVIEW_SUCCESS = 'UPDATE_INTERVIEW_SUCCESS',
  UPDATE_INTERVIEW_FAILED = 'UPDATE_INTERVIEW_FAILED',
  DELETE_INTERVIEW = 'DELETE_INTERVIEW',
  DELETE_INTERVIEW_SUCCESS = 'DELETE_INTERVIEW_SUCCESS',
  DELETE_INTERVIEW_FAILED = 'DELETE_INTERVIEW_FAILED',
  GET_INTERVIEW_BY_ID = 'GET_INTERVIEW_BY_ID',
  GET_INTERVIEW_BY_ID_SUCCESS = 'GET_INTERVIEW_BY_ID_SUCCESS',
  GET_INTERVIEW_BY_ID_FAILED = 'GET_INTERVIEW_BY_ID_FAILED',
  SET_INTERVIEW = 'SET_INTERVIEW'
}

export class GetInterviews implements Action {
  readonly type = InterviewActionType.GET_INTERVIEWS;

  constructor(public payload?: {[key: string]: any}) {
  }
}

export class GetInterviewsSuccess implements Action {
  readonly type = InterviewActionType.GET_INTERVIEWS_SUCCESS;

  constructor(public payload: { [key: string]: any }) {
  }
}

export class GetInterviewsFailed implements Action {
  readonly type = InterviewActionType.GET_INTERVIEWS_FAILED;

  constructor(public payload: string) {
  }
}

export class AddInterview implements Action {
  readonly type = InterviewActionType.ADD_INTERVIEW;

  constructor(public payload: InterviewType) {
  }
}

export class AddInterviewSuccess implements Action {
  readonly type = InterviewActionType.ADD_INTERVIEW_SUCCESS;

  constructor(public payload: InterviewType) {
  }
}

export class AddInterviewFailed implements Action {
  readonly type = InterviewActionType.ADD_INTERVIEW_FAILED;

  constructor(public payload: string) {
  }
}

export class UpdateInterview implements Action {
  readonly type = InterviewActionType.UPDATE_INTERVIEW;

  constructor(public payload: InterviewType) {
  }
}

export class UpdateInterviewSuccess implements Action {
  readonly type = InterviewActionType.UPDATE_INTERVIEW_SUCCESS;

  constructor(public payload: InterviewType) {
  }
}

export class UpdateInterviewFailed implements Action {
  readonly type = InterviewActionType.UPDATE_INTERVIEW_FAILED;

  constructor(public payload: string) {
  }
}

export class DeleteInterview implements Action {
  readonly type = InterviewActionType.DELETE_INTERVIEW;

  constructor(public payload: InterviewType) {
  }
}

export class DeleteInterviewSuccess implements Action {
  readonly type = InterviewActionType.DELETE_INTERVIEW_SUCCESS;

  constructor(public payload: InterviewType) {
  }
}

export class DeleteInterviewFailed implements Action {
  readonly type = InterviewActionType.DELETE_INTERVIEW_FAILED;

  constructor(public payload: string) {
  }
}

export class GetInterviewById implements Action {
  readonly type = InterviewActionType.GET_INTERVIEW_BY_ID;

  constructor(public payload: number) {
  }
}

export class GetInterviewByIdSuccess implements Action {
  readonly type = InterviewActionType.GET_INTERVIEW_BY_ID_SUCCESS;

  constructor(public payload: InterviewType) {
  }
}

export class GetInterviewByIdFailed implements Action {
  readonly type = InterviewActionType.GET_INTERVIEW_BY_ID_FAILED;

  constructor(public payload: number) {
  }
}

export class SetInterview implements Action {
  readonly type = InterviewActionType.SET_INTERVIEW;

  constructor(public payload: InterviewType | null) {
  }
}


export type InterviewsActions =
  GetInterviews |
  GetInterviewsSuccess |
  GetInterviewsFailed |
  AddInterview |
  AddInterviewSuccess |
  AddInterviewFailed |
  UpdateInterview |
  UpdateInterviewSuccess |
  UpdateInterviewFailed |
  DeleteInterview |
  DeleteInterviewSuccess |
  DeleteInterviewFailed |
  GetInterviewById |
  GetInterviewByIdSuccess |
  GetInterviewByIdFailed |
  SetInterview;
