import { Component, OnDestroy, OnInit } from '@angular/core';
import * as actions from '@store/actions/auth.actions';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as authReducers from '@store/reducers/auth.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Subject } from 'rxjs';

@Component({
  selector: 'mts-basic',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  private readonly onDestroy = new Subject<void>();

  constructor(private store: Store<authReducers.State>,
              private updates: Actions) { }

  ngOnInit() {
    this.getMeHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private getMeHandler(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetMe());
    this.updates.pipe(ofType(actions.AuthActionType.GET_ME_SUCCESS,
      actions.AuthActionType.GET_ME_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);
  }
}
