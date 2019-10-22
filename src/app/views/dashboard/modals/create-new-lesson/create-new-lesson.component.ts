import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupType, LessonType, MultipleLessonType, NewLessonDialogData, SubjectType, UserType } from '@app/types/common.types';
import * as groupsReducers from '@store/reducers/groups.reducer';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as teachersReducers from '@store/reducers/users.reducer';
import * as lessonsReducers from '@store/reducers/lessons.reducer';
import * as subjectsActions from '@store/actions/subjects.actions';
import * as teachersActions from '@store/actions/users.actions';
import * as lessonsActions from '@store/actions/lessons.actions';
import { Store } from '@ngrx/store';
import { CustomFormatterProvider } from '@views/dashboard/schedule/custom-formatter.provider';
import { CalendarDateFormatter } from 'angular-calendar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LessonsRequestType, RepeatTermType, RolesTypes } from '@app/types/common.enums';
import { HelperService } from '@services/helper/helper.service';
import { Actions, ofType } from '@ngrx/effects';
import { EditLessonsSetComponent } from '@views/dashboard/modals/edit-lessons-set/edit-lessons-set.component';

@Component({
  selector: 'sch-create-new-lesson',
  templateUrl: './create-new-lesson.component.html',
  styleUrls: ['./create-new-lesson.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomFormatterProvider
    }
  ],
})

export class CreateNewLessonComponent implements OnInit, OnDestroy {
  createNewLessonForm: FormGroup;
  isLoading: boolean;
  groups: GroupType[] = [];
  teachers: UserType[] = [];
  subjects: SubjectType[] = [];
  locale = 'ru';
  private readonly onDestroy = new Subject<void>();
  repeatTermType = RepeatTermType;
  updateMode: boolean;

  constructor(public createDialogRef: MatDialogRef<CreateNewLessonComponent>,
              public editLessonsSetDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public modalData: NewLessonDialogData,
              private fb: FormBuilder,
              private groupsStore: Store<groupsReducers.State>,
              private teachersStore: Store<teachersReducers.State>,
              private subjectsStore: Store<subjectsReducers.State>,
              private lessonsStore: Store<lessonsReducers.State>,
              private updates: Actions,
              private helperService: HelperService) { }

  ngOnInit() {
    this.fetchInitData();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private fetchInitData(): void {
    const defaultParams = {
      page: 1,
      perPage: 200
    };

    this.subjectsStore.dispatch(new subjectsActions.GetSubjects(defaultParams));
    this.subjectsStore
      .select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subjects = res.subjects;
      });

    const teachersParams = {
      page: 1,
      perPage: 200,
      role: RolesTypes.TEACHER
    };
    this.teachersStore.dispatch(new teachersActions.GetUsers(teachersParams));
    this.teachersStore
      .select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.teachers = res.users;
      });

    this.groupsStore
      .select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.groups = res.groups;
      });
  }

  private initForm(): void {
    let formConfig = null;

    if (this.modalData && this.modalData.isUpdateMode) {
      formConfig = this.getFormConfigs(this.modalData.lessonData);
    } else {
      formConfig = this.getFormConfigs();
    }
    this.createNewLessonForm = this.fb.group(formConfig);
  }

  getFormConfigs(lesson: MultipleLessonType  = {} as MultipleLessonType): {[key: string]: any} {
    const config: {[key: string]: any} = {
      teacher: [lesson.teacher ? lesson.teacher.id : null, Validators.required],
      group: [lesson.group ? lesson.group.id : null, Validators.required],
      subject: [lesson.subject ? lesson.subject.id : null, Validators.required],
      lessonMinHour: [lesson.lessonMinHour || this.helperService.setUpTimeFormat(this.modalData.start)],
      lessonMaxHour: [lesson.lessonMaxHour || this.helperService.setUpTimeFormat(this.modalData.end)],
      recurStartDate: [lesson.recurringObject ?
        lesson.recurringObject.recurStartDate :
        this.helperService.prepareRequestDate(this.modalData.start)],
      recurEndDate: [lesson.recurringObject ?
        lesson.recurringObject.recurEndDate :
        this.helperService.prepareRequestDate(this.modalData.start)],
      type: [lesson.recurEndDate || LessonsRequestType.WEEKLY],
      repeatLesson: [this.setLessonRepeating(lesson)],
      daysOfWeek: [lesson.recurringObject ?
        lesson.recurringObject.daysOfWeek :
        null]
    };

    if (this.modalData.isUpdateMode) {
      config.subjectMatter = ['Тема занятия', Validators.required];
      config.notes = [null];
      config.lessonLearners = [null];
    }

    return config;
  }

  private setLessonRepeating(lesson: MultipleLessonType): string {
    if (lesson.recurringObject && (lesson.recurringObject.daysOfWeek.length > 1)) {
      return RepeatTermType.CUSTOM_PERIOD;
    } else {
      return RepeatTermType.NO_REPEAT;
    }
  }

  public handleDateStart(e: any): void {
    this.createNewLessonForm.get('recurStartDate').setValue(
      this.helperService.prepareRequestDate(e)
    );
  }

  public handleDateEnd(e: any): void {
    this.createNewLessonForm.get('recurEndDate').setValue(
      this.helperService.prepareRequestDate(e)
    );
  }

  public changeLessonRepeating(): void {
    if (this.createNewLessonForm.get('repeatLesson').value !== RepeatTermType.NO_REPEAT) {
      const date = new Date(this.modalData.start.toString());
      const recurEndDate = new Date(date.setMonth(date.getMonth() + 2));
      this.createNewLessonForm.get('recurEndDate').setValue(
        this.helperService.prepareRequestDate(recurEndDate)
      );
    } else {
      this.createNewLessonForm.get('recurEndDate').setValue(this.modalData.start);
    }
  }

  public getRepeatDays(days: Array<string>): void {
    this.createNewLessonForm.get('daysOfWeek').setValue(days);
  }

  public switchRepeating(): void {
    this.createNewLessonForm.get('repeatLesson').setValue(RepeatTermType.NO_REPEAT);
  }

  public onClose(): void {
    this.createDialogRef.close();
  }

  private prepareRequestData(formData: {[key: string]: any}): LessonType {
    const lessonData: LessonType = {} as LessonType;
    if (formData.repeatLesson === RepeatTermType.NO_REPEAT && !this.modalData.isUpdateMode) {
      formData.daysOfWeek = [this.modalData.start.getDay()];
    }
    delete formData.repeatLesson;

    for (const prop in formData) {
      if (formData.hasOwnProperty(prop) && formData[prop]) {
        lessonData[prop] = formData[prop];
      }
    }

    return lessonData;
  }

  public showLessonsSetModal(): void {
    const editLessonsSetRef = this.editLessonsSetDialog.open(EditLessonsSetComponent, {
      // data: {
      //   title: event.title,
      //   start: event.start,
      //   end: event.end,
      // }
    });

    editLessonsSetRef.afterClosed().subscribe(result => {
      console.log('editLessonsSetRef ', result);
    });
  }

  private updateOneLessonHandler(lesson: {[key: string]: any}): void {
    const lessonData: LessonType = {
      id: this.modalData.lessonData.id,
      // startDate: this.helperService.prepareRequestDate(lesson.recurStartDate) + 'T' + lesson.lessonMinHour,
      // endDate: this.helperService.prepareRequestDate(lesson.recurStartDate) + 'T' + lesson.lessonMaxHour,
      teacher: lesson.teacher,
      group: lesson.group,
      subject: lesson.subject,
      dayOfWeek: lesson.daysOfWeek[0],
      // notes: '',
      // subjectMatter: '',
      // lessonLearners: [
      //   {
      //     learner: 0,
      //     status: ,
      //     description:
      //   }
      // ]
    };

    this.lessonsStore.dispatch(new lessonsActions.UpdateOneLesson(lessonData));
    this.updates.pipe(
      ofType(lessonsActions.LessonsActionType.UPDATE_ONE_LESSON_SUCCESS,
        lessonsActions.LessonsActionType.UPDATE_ONE_LESSON_FAILED),
      takeUntil(this.onDestroy))
      .subscribe(() => this.createDialogRef.close(true));
  }

  private updateLessonsSetHandler(lesson: {[key: string]: any}): void {
    const lessonData: MultipleLessonType = {
      id: this.modalData.lessonData.recurringObject.id,
      updateAllFrom: lesson.recurStartDate,
      lessonMinHour: lesson.lessonMinHour,
      lessonMaxHour: lesson.lessonMaxHour,
      teacher: lesson.teacher,
      group: lesson.group,
      subject: lesson.subject
    };

    this.lessonsStore.dispatch(new lessonsActions.UpdateLessons(lessonData));
    this.updates.pipe(
      ofType(lessonsActions.LessonsActionType.UPDATE_LESSONS_SUCCESS,
        lessonsActions.LessonsActionType.UPDATE_LESSONS_FAILED),
      takeUntil(this.onDestroy))
      .subscribe(() => this.createDialogRef.close(true));
  }

  private addLessonHandler(lesson: MultipleLessonType | LessonType): void {
    this.lessonsStore.dispatch(new lessonsActions.AddLesson(lesson));
    this.updates.pipe(
      ofType(lessonsActions.LessonsActionType.ADD_LESSON_SUCCESS,
        lessonsActions.LessonsActionType.ADD_LESSON_FAILED),
      takeUntil(this.onDestroy))
      .subscribe(() => this.createDialogRef.close(true));
  }

  public saveLesson(): void {
    this.isLoading = true;

    if (this.modalData.isUpdateMode) {
      this.updateOneLessonHandler(
        this.prepareRequestData(this.createNewLessonForm.value)
      );
    } else {
      this.addLessonHandler(
        this.prepareRequestData(this.createNewLessonForm.value)
      );
    }
  }

  public saveLessonsSet(): void {
    this.isLoading = true;
    this.updateLessonsSetHandler(
      this.prepareRequestData(this.createNewLessonForm.value)
    );
  }
}
