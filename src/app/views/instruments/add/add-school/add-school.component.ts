import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/schools.actions';
import * as schoolsReducers from '@store/reducers/schools.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolType } from '@app/types/common.types';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'mts-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit, OnDestroy {
  schoolForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentSchoolId: number;
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<schoolsReducers.State>,
              private updates: Actions,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
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
      this.store.dispatch(new actions.GetSchoolById(this.currentSchoolId));
      this.store.select(state => state.schools)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.school);
          this.schoolForm = this.fb.group(formConfig);
        });
    } else {
      this.schoolForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentSchoolId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(school: SchoolType = {} as SchoolType): {[key: string]: any} {
    return {
      name: [school.name || null, Validators.required],
      external: [school.external]
    };
  }

  private addSchoolHandler(school: SchoolType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddSchool(school));
    this.updates.pipe(ofType(actions.SchoolActionType.ADD_SCHOOL_SUCCESS,
      actions.SchoolActionType.ADD_SCHOOL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.SchoolActionType.ADD_SCHOOL_SUCCESS) {
          this.schoolForm.reset();
        }
        this.isLoading = false;
      });
  }

  private updateSchoolHandler(school: SchoolType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateSchool(school));
    this.updates.pipe(ofType(actions.SchoolActionType.UPDATE_SCHOOL_SUCCESS,
      actions.SchoolActionType.UPDATE_SCHOOL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.schoolForm.invalid) {
      return;
    }
    const school = this.schoolForm.value;

    if (this.updateMode) {
      school.id = this.currentSchoolId;
      this.updateSchoolHandler(school);
    } else {
      this.addSchoolHandler(school);
    }
  }

}
