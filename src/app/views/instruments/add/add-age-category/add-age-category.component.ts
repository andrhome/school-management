import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as ageCategoriesReducers from '@store/reducers/age-category.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import * as actions from '@store/actions/age-category.actions';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AgeCategoryType } from '@app/types/common.types';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'app-add-age-category',
  templateUrl: './add-age-category.component.html',
  styleUrls: ['./add-age-category.component.scss']
})
export class AddAgeCategoryComponent implements OnInit, OnDestroy {
  ageCategoryForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentCategoryId: number;
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<ageCategoriesReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute) { }

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
      this.store.dispatch(new actions.GetAgeCategory(this.currentCategoryId));
      this.store.select(state => state.ageCategories)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.ageCategory);
          this.ageCategoryForm = this.fb.group(formConfig);
        });
    } else {
      this.ageCategoryForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentCategoryId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(category: AgeCategoryType = {} as AgeCategoryType): {[key: string]: any} {
    return {
      name: [category.name || null, Validators.required],
      fromAge: [category.fromAge || null, Validators.required],
      toAge: [category.toAge || null, Validators.required],
      active: [category.active, Validators.required],
      // subjects: [category.subjects || null, Validators.required],
      // groups: [category.groups || null, Validators.required]
    };
  }

  private addCategoryHandler(category: AgeCategoryType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddAgeCategory(category));
    this.updates.pipe(ofType(actions.AgeCategoryActionType.ADD_AGECATEGORY_SUCCESS,
      actions.AgeCategoryActionType.ADD_AGECATEGORY_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.AgeCategoryActionType.ADD_AGECATEGORY_SUCCESS) {
          this.ageCategoryForm.reset();
        }
        this.isLoading = false;
      });
  }

  private updateCategoryHandler(category: AgeCategoryType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateAgeCategory(category));
    this.updates.pipe(ofType(actions.AgeCategoryActionType.UPDATE_AGECATEGORY_SUCCESS,
      actions.AgeCategoryActionType.UPDATE_AGECATEGORY_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.ageCategoryForm.invalid) {
      return;
    }
    const ageCategory = this.ageCategoryForm.value;

    if (this.updateMode) {
      ageCategory.id = this.currentCategoryId;
      this.updateCategoryHandler(ageCategory);
    } else {
      this.addCategoryHandler(ageCategory);
    }
  }
}
