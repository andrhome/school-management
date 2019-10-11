import { Component, OnDestroy, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import { SubjectType } from '@app/types/common.types';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as subjectsActions from '@store/actions/subjects.actions';

@Component({
  selector: 'mts-subjects-list',
  templateUrl: './subjects-list.component.html'
})
export class SubjectsListComponent implements OnInit, OnDestroy {

  subjects: SubjectType[];
  activeSubject: SubjectType;
  private readonly onDestroy = new Subject<void>();

  constructor(private storeSubjects: Store<subjectsReducers.State>) { }

  ngOnInit() {

    this.storeSubjects.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: {[key: string]: any}) => {
        this.activeSubject = res.subject;
        this.subjects = res.subjects;
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private setActiveSubject(subject): void {
    this.storeSubjects.dispatch(new subjectsActions.SetSubject(subject));
  }

}
