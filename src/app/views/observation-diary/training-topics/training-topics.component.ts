import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ObservationType } from '@app/types/common.enums';

@Component({
  selector: 'app-training-topics',
  templateUrl: './training-topics.component.html',
  styleUrls: ['./training-topics.component.scss']
})
export class TrainingTopicsComponent implements OnInit, OnDestroy {
  groupView: boolean;
  obsType = ObservationType;
  private readonly onDestroy = new Subject<void>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        this.groupView = params.observationType === this.obsType.BY_GROUP;
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }
}
