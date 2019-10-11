import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsSubdivision from '@store/actions/subdivisions.actions';
import * as actionsAgeCategory from '@store/actions/age-category.actions';
import * as actionMaterialMap from '@store/actions/material-maps.actions';
import * as actions from '@store/actions/groups.actions';
import * as subdivisionsReducers from '@store/reducers/subdivisions.reducer';
import * as ageCategoryReducers from '@store/reducers/age-category.reducer';
import * as materialMapReducers from '@store/reducers/material-maps.reducer';
import * as groupsReducers from '@store/reducers/groups.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { GroupType, SubdivisionType, UserType } from '@app/types/common.types';
import { AgeCategoryType } from '@app/types/common.types';
import { MapMaterialsType } from '@app/types/common.types';
import { PluralItemsType } from '@app/types/common.enums';

@Component({
  selector: 'mts-add-big-group',
  templateUrl: './add-big-group.component.html',
  styleUrls: ['./add-big-group.component.scss']
})
export class AddBigGroupComponent implements OnInit, OnDestroy {
  private readonly onDestroy = new Subject<void>();
  subscription: Subscription;
  isLoading: boolean;
  groupForm: FormGroup;
  updateMode: boolean;
  currentGroupId: number;
  subdivisions: SubdivisionType[];
  ageCategories: AgeCategoryType[];
  materialMaps: MapMaterialsType[];
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<groupsReducers.State>,
              private storeSubdivisions: Store<subdivisionsReducers.State>,
              private storeAgeCategories: Store<ageCategoryReducers.State>,
              private storeMaterialMaps: Store<materialMapReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getAgeCategorySubdivision();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
    this.subscription.unsubscribe();
  }

  getAgeCategorySubdivision(): void {
    const params = {
      page: 1,
      perPage: 100
    };

    this.store.dispatch(new actionsSubdivision.GetSubdivisions(params));
    this.storeSubdivisions.select(state => state.subdivisions).subscribe((res: { [key: string]: any }) => {
      this.subdivisions = res.subdivisions;
    });
    this.store.dispatch(new actionsAgeCategory.GetAgeCategories(params));
    this.storeAgeCategories.select(state => state.ageCategories).subscribe((res: { [key: string]: any }) => {
      this.ageCategories = res.ageCategories;
    });
    this.store.dispatch(new actionMaterialMap.GetMaterialMaps(params));
    this.storeMaterialMaps.select(state => state.materialMaps).subscribe((res: { [key: string]: any }) => {
      this.materialMaps = res.materialMaps;
    });
  }

  initForm(): void {
    this.initUpdateMode();
    let formConfig = this.getFormConfigs();
    if (this.updateMode) {
      this.store.dispatch(new actions.GetGroupById(this.currentGroupId));
      this.store.select(state => state.groups)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.group);
          this.groupForm = this.fb.group(formConfig);
        });
    } else {
      this.groupForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentGroupId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(group: GroupType = {} as GroupType): {[key: string]: any} {
    return {
      name: [group.name || null, Validators.required],
      subdivision: [group.subdivision || null, Validators.required],
      ageCategory: [group.ageCategory || null, Validators.required],
      // achievementMap: [group.achievementMap || null, Validators.required],
      // materialMap: [group.materialMap || null],
      // materialMapShow: [group.materialMapShow],
      // learners: [group.learners || null]
    };
  }

  private addGroupHandler(group: GroupType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddGroup(group));
    this.updates.pipe(ofType(actions.GroupActionType.ADD_GROUP_SUCCESS,
      actions.GroupActionType.ADD_GROUP_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.GroupActionType.ADD_GROUP_SUCCESS) {
          this.groupForm.reset();
        }
        this.isLoading = false;
      });
  }

  private updateGroupHandler(group: GroupType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateGroup(group));
    this.updates.pipe(ofType(actions.GroupActionType.UPDATE_GROUP_SUCCESS,
      actions.GroupActionType.UPDATE_GROUP_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.groupForm.invalid) {
      return;
    }
    this.isLoading = true;
    const group = this.groupForm.value;

    if (this.updateMode) {
      group.id = this.currentGroupId;
      this.updateGroupHandler(group);
    } else {
      this.addGroupHandler(group);
    }
  }

}
