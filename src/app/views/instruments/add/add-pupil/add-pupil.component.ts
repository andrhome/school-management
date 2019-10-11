import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsAgeCategory from '@store/actions/age-category.actions';
import * as actionsGroup from '@store/actions/groups.actions';
import * as actionsTeacher from '@store/actions/users.actions';
import * as actions from '@store/actions/pupils.actions';
import * as ageCategoryReducers from '@store/reducers/age-category.reducer';
import * as groupReducers from '@store/reducers/groups.reducer';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import * as teachersReducers from '@store/reducers/users.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from '@services/constants.service';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeCategoryType, GroupType, PupilType, UserType } from '@app/types/common.types';
import { HelperService } from '@services/helper/helper.service';
import { PluralItemsType, RolesTypes } from '@app/types/common.enums';

@Component({
  selector: 'mts-add-pupil',
  templateUrl: './add-pupil.component.html',
  styleUrls: ['./add-pupil.component.scss']
})
export class AddPupilComponent implements OnInit, OnDestroy {
  pupilForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode = false;
  currentPupil: PupilType;
  currentPupilId: number;
  ageCategories: AgeCategoryType[];
  groups: GroupType[];
  teachers: UserType[];
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<pupilsReducers.State>,
              private storeAgeCategories: Store<ageCategoryReducers.State>,
              private storeGroups: Store<groupReducers.State>,
              private storeTeachers: Store<teachersReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute,
              private router: Router,
              private helperService: HelperService) {
  }

  ngOnInit() {
    this.getInitData();
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
      this.store.select(state => state.pupils)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          if (res.pupil.id === this.currentPupilId) {
            this.currentPupil = res.pupil;
          } else {
            this.currentPupil = res.pupils.find(pupil => pupil.id === this.currentPupilId);
          }
          formConfig = this.getFormConfigs(this.currentPupil);
          this.pupilForm = this.fb.group(formConfig);
        });
      if (!(this.currentPupil && this.currentPupil.id)) {
        this.fetchPupilById();
      }
    } else {
      this.pupilForm = this.fb.group(formConfig);
    }
  }

  private fetchPupilById(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetPupilById(this.currentPupilId));
    this.store.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((resp: { [key: string]: any }) => {
        this.isLoading = false;
        this.currentPupil = resp.pupil;
        const formConfig = this.getFormConfigs(this.currentPupil);
        this.pupilForm = this.fb.group(formConfig);
      });
  }

  private getInitData(): void {
    const params = {
      page: 1,
      perPage: 100
    };

    this.store.dispatch(new actionsAgeCategory.GetAgeCategories(params));
    this.storeAgeCategories.select(state => state.ageCategories)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.ageCategories = res.ageCategories;
      });
    this.store.dispatch(new actionsGroup.GetGroups(params));
    this.storeGroups.select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.groups = res.groups;
      });

    const teachersParams = {
      role: RolesTypes.TEACHER,
      page: 1,
      perPage: 100
    };
    this.storeTeachers.dispatch(new actionsTeacher.GetUsers(teachersParams));
    this.storeTeachers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.teachers = res.users;
      });
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentPupilId = +params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(pupil: PupilType = {} as PupilType): {[key: string]: any} {
    return {
      lastName: [pupil.lastName || null, Validators.required],
      firstName: [pupil.firstName || null, Validators.required],
      email: [pupil.email || null, Validators.pattern(Constants.emailRegExp)],
      gender: [pupil.gender || null, Validators.required],
      dob: [pupil.dob || new Date(), Validators.required],
      enrollmentDate: [pupil.enrollmentDate || new Date(), Validators.required],
      ageCategory: [pupil.ageCategory ? pupil.ageCategory.id : null, Validators.required],
      yearOfLearning: [pupil.yearOfLearning || null, Validators.required],
      phone: [pupil.phone || null],
      address: [pupil.address || null],
      active: [pupil.active, Validators.required],
      group: [pupil.group ? pupil.group.id : null, Validators.required],
      health: [pupil.health || null],
      note: [pupil.note || null],
      leaderTeacher: [pupil.leaderTeacher ? pupil.leaderTeacher.id : null]
    };
  }

  onDateChange(e: Date, field: string): void {
    this.pupilForm.get(field).setValue(this.helperService.prepareRequestDate(e));
  }

  private addPupilHandler(pupil: PupilType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddPupil(pupil));
    this.updates.pipe(ofType(actions.PupilActionType.ADD_PUPIL_SUCCESS,
      actions.PupilActionType.ADD_PUPIL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.PupilActionType.ADD_PUPIL_SUCCESS) {
          this.router.navigate(['instruments/list/pupils/' + res.payload.id]);
        }
        this.isLoading = false;
      });
  }

  private updatePupilHandler(pupil: PupilType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdatePupil(pupil));
    this.updates.pipe(ofType(actions.PupilActionType.UPDATE_PUPIL_SUCCESS,
      actions.PupilActionType.UPDATE_PUPIL_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.PupilActionType.UPDATE_PUPIL_SUCCESS) {
          this.router.navigate([`/instruments/list/pupils/${this.currentPupilId}`]);
        }
        this.isLoading = false;
      });
  }

  submit(): void {
    if (this.pupilForm.invalid) {
      return;
    }
    this.isLoading = true;
    const pupil = this.pupilForm.value;
    if (this.updateMode) {
      pupil.id = this.currentPupil.id;
      this.updatePupilHandler(pupil);
    } else {
      this.addPupilHandler(pupil);
    }
  }

}
