import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserType } from '@app/types/common.types';
import * as usersReducers from '@store/reducers/users.reducer';
import * as actions from '@store/actions/users.actions';
import { ActivatedRoute } from '@angular/router';
import { Constants } from '@services/constants.service';
import { PluralItemsType, RolesTypes } from '@app/types/common.enums';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit, OnDestroy {
  adminForm: FormGroup;
  subscription: Subscription;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();
  updateMode: boolean;
  currentAdmin: UserType;
  currentAdminId: number;
  pluralItemsType = PluralItemsType;

  constructor(private fb: FormBuilder,
              private store: Store<usersReducers.State>,
              private updates: Actions,
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
      this.store.dispatch(new actions.GetUserById(this.currentAdminId));
      this.store.select(state => state.users)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((res: { [key: string]: any }) => {
          this.currentAdmin = res.user;
          formConfig = this.getFormConfigs(res.user);
          this.adminForm = this.fb.group(formConfig);
        });
    } else {
      formConfig.plainPassword = [null, Validators.required];
      this.adminForm = this.fb.group(formConfig);
    }
  }

  private initUpdateMode(): void {
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params && params.id) {
        this.updateMode = true;
        this.currentAdminId = params.id;
      } else {
        this.updateMode = false;
      }
    });
  }

  private getFormConfigs(admin: UserType = {} as UserType): {[key: string]: any} {
    return {
      lastName: [admin.lastName || null, Validators.required],
      firstName: [admin.firstName || null, Validators.required],
      email: [admin.email || null, Validators.pattern(Constants.emailRegExp)],
      role: [RolesTypes.ADMIN],
    };
  }

  private addUserHandler(user: UserType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.AddUser(user));
    this.updates.pipe(ofType(actions.UserActionType.ADD_USER_SUCCESS,
      actions.UserActionType.ADD_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        if (res.type === actions.UserActionType.ADD_USER_SUCCESS) {
          this.adminForm.reset();
          this.adminForm.get('role').setValue(RolesTypes.ADMIN);
        }
        this.isLoading = false;
      });
  }

  private updateUserHandler(user: UserType): void {
    this.isLoading = true;
    this.store.dispatch(new actions.UpdateUser(user));
    this.updates.pipe(ofType(actions.UserActionType.UPDATE_USER_SUCCESS,
      actions.UserActionType.UPDATE_USER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.adminForm.invalid) {
      return;
    }
    this.isLoading = true;
    const admin = this.adminForm.value;
    if (this.updateMode) {
      admin.id = this.currentAdmin.id;
      this.updateUserHandler(admin);
    } else {
      this.addUserHandler(admin);
    }
  }
}
