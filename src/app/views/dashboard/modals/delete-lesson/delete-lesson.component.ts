import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteLessonCategoryType } from '@app/types/common.enums';
import * as actions from '@store/actions/lessons.actions';
import * as lessonsReducer from '@store/reducers/lessons.reducer';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'sch-delete-lesson',
  templateUrl: './delete-lesson.component.html',
  styleUrls: ['./delete-lesson.component.scss']
})
export class DeleteLessonComponent implements OnInit, OnDestroy {
  deleteForm: FormGroup;
  deleteLessonCategoryType = DeleteLessonCategoryType;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<DeleteLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: any,
              private fb: FormBuilder,
              private store: Store<lessonsReducer.State>,
              private updates: Actions) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  initForm(): void {
    this.deleteForm = this.fb.group({
      deleteValue: [null, Validators.required]
    });
  }

  private deleteOneLesson(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.DeleteOneLesson(this.modalData.lessonData));
    this.updates
      .pipe(
        ofType(actions.LessonsActionType.DELETE_ONE_LESSON_SUCCESS,
          actions.LessonsActionType.DELETE_ONE_LESSON_FAILED),
        takeUntil(this.onDestroy))
      .subscribe(() => this.dialogRef.close(true));
  }

  private deleteLessonsSet(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.DeleteLessons(this.modalData.lessonData.recurringObject));
    this.updates
      .pipe(
        ofType(actions.LessonsActionType.DELETE_LESSONS_SUCCESS,
          actions.LessonsActionType.DELETE_LESSONS_FAILED),
        takeUntil(this.onDestroy))
      .subscribe(() => this.dialogRef.close(true));
  }

  public deleteLessonHandler(): void {
    if (this.deleteForm.value.deleteValue === DeleteLessonCategoryType.ONLY_ONE) {
      this.deleteOneLesson();
    } else {
      this.deleteLessonsSet();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }
}
