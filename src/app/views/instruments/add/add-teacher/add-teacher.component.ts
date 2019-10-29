import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actionsSubdivision from '@store/actions/subdivisions.actions';
import * as actionsAgeCategory from '@store/actions/age-category.actions';
import * as actionsGroup from '@store/actions/groups.actions';
import * as actions from '@store/actions/users.actions';
import * as subdivisionsReducers from '@store/reducers/subdivisions.reducer';
import * as ageCategoryReducers from '@store/reducers/age-category.reducer';
import * as groupReducers from '@store/reducers/groups.reducer';
import * as teachersReducers from '@store/reducers/users.reducer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeCategoryType, GroupType, SubdivisionType, UserType } from '@app/types/common.types';
import { imageRegex, maxFileSize } from '@services/constants/file-types';
import { ToastrService } from 'ngx-toastr';
import { PluralItemsType, RolesTypes } from '@app/types/common.enums';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit, OnDestroy {
  teacherForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentTeacherId: number;
  subdivisions: SubdivisionType[];
  ageCategories: AgeCategoryType[];
  groups: GroupType[];
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<teachersReducers.State>,
              private storeSubdivisions: Store<subdivisionsReducers.State>,
              private storeAgeCategories: Store<ageCategoryReducers.State>,
              private storeGroups: Store<groupReducers.State>,
              private updates: Actions,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
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

  initForm(): void {
    this.initUpdateMode();
    let formConfig = this.getFormConfigs();
    if (this.updateMode) {
      this.store.dispatch(new actions.GetUserById(this.currentTeacherId));
      this.store.select(state => state.users)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          formConfig = this.getFormConfigs(res.user);
          this.teacherForm = this.fb.group(formConfig);
        });
    } else {
      this.teacherForm = this.fb.group(formConfig);
    }
  }

  private getInitData(): void {
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
    this.store.dispatch(new actionsGroup.GetGroups(params));
    this.storeGroups.select(state => state.groups).subscribe((res: { [key: string]: any }) => {
      this.groups = res.groups;
    });
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentTeacherId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(teacher: UserType = {} as UserType): {[key: string]: any} {
    const config: {[key: string]: any} = {
      email: [teacher.email || null, Validators.required],
      lastName: [teacher.lastName || null, Validators.required],
      firstName: [teacher.firstName || null, Validators.required],
      role: [RolesTypes.TEACHER]
      // avatarPreview: [null],
    };

    if (!this.updateMode) {
      config.plainPassword = [null, Validators.required];
    }

    return config;
  }

  onAvatarChange(event) {
    if (event.target.files && event.target.files.length) {
      const reader = new FileReader();
      const [file] = event.target.files;
      const avatarFormData = new FormData();

      if (!imageRegex.exec(file.name)) {
        this.toastr.error(`Данный тип файла не поддерживается!`);
      } else if (file.size > maxFileSize) {
        this.toastr.error(`Размер файла не должен превышать ${maxFileSize / 1024 / 1024} Мб`);
      } else {
        avatarFormData.append('file', file);
        avatarFormData.append('context', 'user');

        reader.readAsDataURL(file);
        reader.onload = () => {
          this.teacherForm.patchValue({
            avatarFormData,
            avatarPreview: reader.result
          });
        };
      }
    }
  }

  getAvatarUrl() {
    // if (this.teacherForm.get('avatarPreview').value) {
    //   return this.teacherForm.get('avatarPreview').value;
    // }

    return '/assets/images/user-placeholder.png';
  }

  private addTeacherHandler(teacher: UserType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddUser(teacher));
    this.updates.pipe(ofType(actions.UserActionType.ADD_USER_SUCCESS,
      actions.UserActionType.ADD_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.UserActionType.ADD_USER_SUCCESS) {
          this.router.navigate(['instruments/list/teachers/' + res.payload.id]);
          this.teacherForm.get('role').setValue(RolesTypes.TEACHER);
        }
        this.isLoading = false;
      });
  }

  private updateTeacherHandler(teacher: UserType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateUser(teacher));
    this.updates.pipe(ofType(actions.UserActionType.UPDATE_USER_SUCCESS,
      actions.UserActionType.UPDATE_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.UserActionType.UPDATE_USER_SUCCESS) {
          this.router.navigate([`/instruments/list/teachers/${this.currentTeacherId}`]);
        }
        this.isLoading = false;
      });
  }

  submit(): void {
    if (this.teacherForm.invalid) {
      return;
    }
    const teacher = this.teacherForm.value;

    if (this.updateMode) {
      teacher.id = this.currentTeacherId;
      this.updateTeacherHandler(teacher);
    } else {
      this.addTeacherHandler(teacher);
    }
  }

}
