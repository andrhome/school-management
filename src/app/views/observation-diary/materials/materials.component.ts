import { Component, OnDestroy, OnInit } from '@angular/core';
import { LessonType } from '@app/types/common.types';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ObservationType } from '@app/types/common.enums';

@Component({
  selector: 'sch-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit, OnDestroy {

  currentLesson: LessonType;
  lessonsProgress = [
    {
      name: 'УПЖ',
      progressValue: 18,
      progressPercent: 10,
      progressPlan: 24,
      color: '#D0F9FF',
    },
    {
      name: 'Сенсорика',
      progressValue: 10,
      progressPercent: 60,
      progressPlan: 10,
      color: '#FFD9D9',
    },
    {
      name: 'Математика',
      progressValue: 8,
      progressPercent: 40,
      progressPlan: 32,
      color: '#D5E8FF',
    },
    {
      name: 'Язык',
      progressValue: 100,
      progressPercent: 100,
      progressPlan: 100,
      color: '#E0FFE1',
    },
    {
      name: 'Природа и культура',
      progressValue: 52,
      progressPercent: 70,
      progressPlan: 52,
      color: '#FFDF8D',
    },
    {
      name: 'Социально -коммуникативное развитие',
      progressValue: 2,
      progressPercent: 90,
      progressPlan: 24,
      color: '#E3D4FB',
    },
  ];

  list = [
    {
      id: 1,
      name: 'first'
    },
    {
      id: 2,
      name: 'second'
    },
  ];

  showPlan = true;
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

  public changePlanStatus(e): void {
    this.showPlan = e.checked;
  }

  public changeCurrentLesson(e): void {
    this.currentLesson = e;
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

}
