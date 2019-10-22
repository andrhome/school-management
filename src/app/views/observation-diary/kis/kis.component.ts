import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { InterviewType, UserType } from '@app/types/common.types';
import { takeUntil } from 'rxjs/operators';
import { Actions, ofType } from '@ngrx/effects';
import * as actions from '@store/actions/interviews.actions';
import * as interviewsReducers from '@store/reducers/interviews.reducer';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as authReducers from '@store/reducers/auth.reducer';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { CommentsParentType } from '@app/types/common.enums';
import { CreateInterviewComponent } from '@views/observation-diary/modals/create-interview/create-interview.component';
import * as usersReducers from '@store/reducers/users.reducer';
import * as pupilsReducers from '@store/reducers/pupils.reducer';

@Component({
  selector: 'sch-kis',
  templateUrl: './kis.component.html',
  styleUrls: ['./kis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KisComponent implements OnInit, OnDestroy {
  currentUser: UserType;
  isLoading = true;
  private readonly onDestroy = new Subject<void>();
  interviews: InterviewType[] = [];
  postType = CommentsParentType.INTERVIEW;
  lastFilteredTeacher: number;
  lastFilteredPupil: number;

  defParams: { [key: string]: any } = {
    page: 1,
    perPage: 100,
    learner: null,
    createdBy: null,
  };

  constructor(public dialog: MatDialog,
              private storeInterviews: Store<interviewsReducers.State>,
              private storePupils: Store<pupilsReducers.State>,
              private storeUsers: Store<usersReducers.State>,
              private updates: Actions,
              private storeAuth: Store<authReducers.State>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.selectMeHandler();
    this.getInterviewsInitial();
    this.listenerUpdatesAddEditInterview();
    this.listenerUpdatesDeleteInterview();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private selectMeHandler(): void {
    this.storeAuth.select(state => state.me)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.currentUser = res.me;
        this.cdr.markForCheck();
      });
  }

  private getInterviewsInitial(): void {
    this.storePupils.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.pupil && res.pupil.id !== this.lastFilteredPupil) {
          this.lastFilteredPupil = res.pupil.id;
          this.defParams['learner'] = this.lastFilteredPupil;
          this.dispatchInterviewsGet(this.defParams);
        }
      });

    this.storeUsers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.user && res.user.id !== this.lastFilteredTeacher) {
          this.lastFilteredTeacher = res.user.id;
          this.defParams['createdBy'] = this.lastFilteredTeacher;
          this.dispatchInterviewsGet(this.defParams);
        }
      });

    this.storeInterviews.select(state => state.interviews)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.total !== null) {
          this.interviews = res.interviews;
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  private dispatchInterviewsGet(params: {[key: string]: any}): void | boolean {
    params = {...params};
    for (const i in params) {
      if (params.hasOwnProperty(i) && params[i] === null) {
        return false;
      }
    }
    this.isLoading = true;
    this.cdr.markForCheck();
    this.storeInterviews.dispatch(new actions.GetInterviews(params));
  }

  private listenerUpdatesAddEditInterview(): void {
    this.updates.pipe(ofType(
      actions.InterviewActionType.ADD_INTERVIEW_SUCCESS,
      actions.InterviewActionType.ADD_INTERVIEW_FAILED,
      actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS,
      actions.InterviewActionType.UPDATE_INTERVIEW_FAILED,
      ))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.dispatchInterviewsGet(this.defParams);
      });
  }

  private listenerUpdatesDeleteInterview(): void {
    this.updates.pipe(ofType(actions.InterviewActionType.DELETE_INTERVIEW_SUCCESS,
      actions.InterviewActionType.DELETE_INTERVIEW_SUCCESS))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.dispatchInterviewsGet(this.defParams);
      });
  }

  public createUpdateInterview(interview?: InterviewType): void {
    const config = interview ? {data: interview} : null;
    const dialogRef = this.dialog.open(CreateInterviewComponent, config);
  }

  private deleteInterview(interview: InterviewType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить информацию о данном собеседовании?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.cdr.markForCheck();
        this.storeInterviews.dispatch(new actions.DeleteInterview(interview));
      }
    });
  }

}
