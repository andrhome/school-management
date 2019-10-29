import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Constants } from '@services/constants.service';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/auth.actions';
import * as authReducers from '@store/reducers/auth.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HelperService } from '@services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();

  constructor(private store: Store<authReducers.State>,
              private updates: Actions,
              private helperService: HelperService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.helperService.checkIfAuthorized();
    this.initForm();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  initForm(): void {
    const formConfig = {
      email: ['', [Validators.required, Validators.pattern(Constants.emailRegExp)]],
      password: ['', Validators.required]
    };
    this.loginForm = this.fb.group(formConfig);
  }

  private loginHandler(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.Login(this.loginForm.value));
    this.updates.pipe(ofType(actions.AuthActionType.LOGIN_SUCCESS,
      actions.AuthActionType.LOGIN_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginHandler();
  }
}
