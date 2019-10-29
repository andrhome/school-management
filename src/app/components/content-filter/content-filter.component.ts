import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PupilType } from '@app/types/common.types';
import { Store } from '@ngrx/store';
import * as pupilReducers from '@store/reducers/pupils.reducer';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-content-filter',
  templateUrl: './content-filter.component.html',
  styleUrls: ['./content-filter.component.scss']
})
export class ContentFilterComponent implements OnInit, OnDestroy {
  @Input() groupView: boolean;

  currentPupil: PupilType;
  private readonly onDestroy = new Subject<void>();

  constructor(private store: Store<pupilReducers.State>) { }

  ngOnInit() {
    this.store.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.currentPupil = res.pupil;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
