import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import * as actions from '@store/actions/pupils.actions';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { PupilType } from '@app/types/common.types';
import { PluralItemsType, UnitItemType } from '@app/types/common.enums';

@Component({
  selector: 'mts-pupil-details',
  templateUrl: './pupil-details.component.html',
  styleUrls: ['./pupil-details.component.scss']
})
export class PupilDetailsComponent implements OnInit, OnDestroy {
  currentPupil: PupilType;
  currentPupilId: number;
  private readonly onDestroy = new Subject<void>();
  isLoading: boolean;
  unitItemType = UnitItemType;
  pluralItemsType = PluralItemsType;

  constructor(private route: ActivatedRoute,
              private store: Store<pupilsReducers.State>,
              private updates: Actions) { }

  ngOnInit() {
    this.initData();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private initData(): void {
    this.route.params
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        if (params && params.id) {
          this.currentPupilId = +params.id;
          this.store.select(state => state.pupils)
            .pipe(takeUntil(this.onDestroy))
            .subscribe((res: { [key: string]: any }) => {
              if (res.pupil.id === this.currentPupilId) {
                this.currentPupil = res.pupil;
              } else {
                this.currentPupil = res.pupils.find(pupil => pupil.id === this.currentPupilId);
              }
            });

          if (!(this.currentPupil && this.currentPupil.id)) {
            this.fetchPupilById();
          }

          this.updates
            .pipe(
              ofType(actions.PupilActionType.GET_PUPIL_BY_ID_SUCCESS,
                actions.PupilActionType.GET_PUPIL_BY_ID_FAILED),
              takeUntil(this.onDestroy))
            .subscribe(() => this.isLoading = false);
        }
      });
  }

  private fetchPupilById(): void {
    this.isLoading = true;
    this.store.dispatch(new actions.GetPupilById(this.currentPupilId));
    this.store.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((resp: { [key: string]: any }) => {
        this.isLoading = false;
        this.currentPupil = resp.pupil;
      });
  }

}
