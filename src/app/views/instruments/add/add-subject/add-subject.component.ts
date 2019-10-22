import { Component, OnDestroy, OnInit } from '@angular/core';
import * as actionsAgeCategories from '@store/actions/age-category.actions';
import { Subject, Subscription } from 'rxjs';
import { AgeCategoryType, SubjectType } from '@app/types/common.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';
import { Store } from '@ngrx/store';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import { ActivatedRoute } from '@angular/router';
import * as actions from '@store/actions/subjects.actions';
import { takeUntil } from 'rxjs/operators';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'sch-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit, OnDestroy {
  subjectForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentSubjectId: number;
  ageCategories: AgeCategoryType[];
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<subjectsReducers.State>,
              private storeAgeCategories: Store<ageCategoriesReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAgeCategories();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
  }

  private initForm(): void {
    this.initUpdateMode();
    let formConfig = this.getFormConfigs();
    if (this.updateMode) {
      this.store.dispatch(new actions.GetSubject(this.currentSubjectId));
      this.store.select(state => state.subjects).subscribe((res: { [key: string]: any }) => {
        formConfig = this.getFormConfigs(res.subject);
        this.subjectForm = this.fb.group(formConfig);
      });
    } else {
      this.subjectForm = this.fb.group(formConfig);
    }
  }

  private getAgeCategories() {
    const params = {
      page: 1,
      perPage: 100
    };
    this.storeAgeCategories.dispatch(new actionsAgeCategories.GetAgeCategories(params));
    this.storeAgeCategories.select(state => state.ageCategories).subscribe((res: { [key: string]: any }) => {
      this.ageCategories = res.ageCategories;
    });
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentSubjectId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(subject: SubjectType = {} as SubjectType): {[key: string]: any} {
    return {
      name: [subject.name || null, Validators.required],
      ageCategories: [subject.ageCategories || null, Validators.required],
    };
  }

  private addSubjectHandler(subject: SubjectType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddSubject(subject));
    this.updates.pipe(ofType(actions.SubjectActionType.ADD_SUBJECT_SUCCESS,
      actions.SubjectActionType.ADD_SUBJECT_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.SubjectActionType.ADD_SUBJECT_SUCCESS) {
          this.subjectForm.reset();
        }
        this.isLoading = false;
      });
  }

  private updateSubjectHandler(subject: SubjectType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateSubject(subject));
    this.updates.pipe(ofType(actions.SubjectActionType.UPDATE_SUBJECT_SUCCESS,
      actions.SubjectActionType.UPDATE_SUBJECT_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.subjectForm.invalid) {
      return;
    }
    const subject = this.subjectForm.value;

    if (this.updateMode) {
      subject.id = this.currentSubjectId;
      this.updateSubjectHandler(subject);
    } else {
      this.addSubjectHandler(subject);
    }
  }
}
