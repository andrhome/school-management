import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InterviewType, PupilType } from '@app/types/common.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as actions from '@store/actions/interviews.actions';
import * as interviewsReducers from '@store/reducers/interviews.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { HelperService } from '@services/helper/helper.service';

@Component({
  selector: 'sch-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInterviewComponent implements OnInit, OnDestroy {
  form: FormGroup;
  pupils: PupilType[];
  pupilCurrentId: number;
  updateMode = false;
  isLoading = false;
  meetDate = this.helperService.prepareRequestDate(new Date());
  private onDestroy = new Subject();

  constructor(public dialogRef: MatDialogRef<CreateInterviewComponent>,
              private storeInterviews: Store<interviewsReducers.State>,
              private storePupils: Store<pupilsReducers .State>,
              private updates: Actions,
              private cdr: ChangeDetectorRef,
              private helperService: HelperService,
              @Inject(MAT_DIALOG_DATA) public data: InterviewType,
              private fb: FormBuilder ) { }

  ngOnInit() {
    this.updateMode = !!this.data;
    this.initForm();
    this.selectPupils();
    this.listenerUpdatesEditInterview();

    if (this.updateMode) {
      this.meetDate = this.data.meetDate;
    }
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  public handleDateStart(e): void {
    this.meetDate = this.helperService.prepareRequestDate(e);
  }

  private listenerUpdatesEditInterview(): void {
    this.updates.pipe(ofType(actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS,
      actions.InterviewActionType.UPDATE_INTERVIEW_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS) {
          this.dialogRef.close();
        }
        this.isLoading = false;
      });
  }

  private selectPupils(): void {
    this.storePupils.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.pupil) {
          this.pupils = res.pupils;
          this.pupilCurrentId = res.pupil.id;
          this.form.controls['learner'].patchValue(this.pupilCurrentId);
        }
      });
  }

  private   initForm(): void {
    const formConfig = {
      learner: [this.data ? this.data.learner : null, [Validators.required]],
      context: [this.data ? this.data.context : null, [ Validators.required ]],
      arrangements: [this.data ? this.data.arrangements : null, [ Validators.required, ]],
      familySideParticipants: [this.data ? this.data.familySideParticipants : null, [ Validators.required ]],
      schoolSideParticipants: [this.data ? this.data.schoolSideParticipants : null, [ Validators.required ]],
    };

    this.form = this.fb.group(formConfig as {[key: string]: any});
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  private addInterviewHandler(updatedInterview: InterviewType): void {
    this.storeInterviews.dispatch(new actions.AddInterview(updatedInterview));
    this.updates.pipe(ofType(actions.InterviewActionType.ADD_INTERVIEW_SUCCESS,
      actions.InterviewActionType.ADD_INTERVIEW_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        if (res.type === actions.InterviewActionType.ADD_INTERVIEW_SUCCESS) {
          this.dialogRef.close('success');
        }
      });
  }

  private updateInterviewHandler(updatedInterview: InterviewType): void {
    this.storeInterviews.dispatch(new actions.UpdateInterview(updatedInterview));
    this.updates.pipe(ofType(actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS,
      actions.InterviewActionType.UPDATE_INTERVIEW_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        if (res.type === actions.InterviewActionType.UPDATE_INTERVIEW_SUCCESS) {
          this.dialogRef.close('success');
        }
      });
  }

  public onSave(): any {
    if (this.form.invalid) {
      return false;
    }

    const updatedInterview = this.form.value;
    updatedInterview.meetDate = this.meetDate;

    this.isLoading = true;
    if (this.updateMode) {
      updatedInterview.id = this.data.id;
      this.updateInterviewHandler(updatedInterview);
    } else {
      this.addInterviewHandler(updatedInterview);
    }
  }

}
