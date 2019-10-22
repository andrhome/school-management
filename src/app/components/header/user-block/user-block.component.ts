import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from '@store/actions/auth.actions';
import * as authReducers from '@store/reducers/auth.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserType } from '@app/types/common.types';

@Component({
  selector: 'sch-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.scss']
})
export class UserBlockComponent implements OnInit, OnDestroy {
  user: UserType;
  private readonly onDestroy = new Subject<void>();

  constructor(private store: Store<authReducers.State>) { }

  ngOnInit() {
    this.selectMeHandler();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private selectMeHandler(): void {
    this.store.select(state => state.me)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.user = res.me;
      });
  }

  logout(): void {
    this.store.dispatch(new actions.Logout());
  }
}
