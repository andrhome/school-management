import {
  Component,
  ChangeDetectorRef,
  OnInit,
  ChangeDetectionStrategy, OnDestroy,
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { DayViewHourSegment } from 'calendar-utils';
import { CalendarEventTimesChangedEvent } from 'angular-calendar/modules/common/calendar-event-times-changed-event.interface';

import { endOfWeek, addDays, addMinutes } from 'date-fns';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventTitleFormatter,
  CalendarView,
  DAYS_OF_WEEK
} from 'angular-calendar';
import { CustomEventTitleFormatter, CustomFormatterProvider } from './custom-formatter.provider';
import { finalize, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CreateNewLessonComponent } from '@views/dashboard/modals/create-new-lesson/create-new-lesson.component';
import { EditLessonComponent } from '@views/dashboard/modals/edit-lesson/edit-lesson.component';
import { HelperService } from '@services/helper/helper.service';
import * as groupsReducers from '@store/reducers/groups.reducer';
import * as lessonsReducers from '@store/reducers/lessons.reducer';
import * as groupsActions from '@store/actions/groups.actions';
import * as lessonsActions from '@store/actions/lessons.actions';
import { Store } from '@ngrx/store';
import { BaseFiltersType, LessonsStatusType } from '@app/types/common.enums';
import { GroupType } from '@app/types/common.types';
import { Actions, ofType } from '@ngrx/effects';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: 'rgba(213, 232, 255, 0.71)',
    secondary: 'rgba(213, 232, 255, 0.71)'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'mts-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomFormatterProvider
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ],
})

export class ScheduleComponent implements OnInit, OnDestroy {
  hourSegments = 2;
  hourSegmentHeight = 15 * 2;
  dayStartHour = 8;
  dayEndHour = 20;
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  locale = 'ru';
  dragToCreateActive = false;
  events: CalendarEvent[] = [];
  groups: GroupType[] = [];
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  private readonly onDestroy = new Subject<void>();
  isLoading: boolean;
  baseFiltersType = BaseFiltersType;
  filtersData = {
    startDate: null,
    group: null
  };
  currentWeekNumber: number;

  constructor(protected cdr: ChangeDetectorRef,
              public dialog: MatDialog,
              private helperService: HelperService,
              private groupsStore: Store<groupsReducers.State>,
              private lessonsStore: Store<lessonsReducers.State>,
              private updates: Actions) { }

  ngOnInit(): void {
    this.currentWeekNumber = this.helperService.getWeekNumber(new Date());
    this.fetchLessons();
    this.selectLessonsHandler();
    this.fetchGroups();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private fetchLessons(queryParams: { [key: string]: any } = {}): void {
    const currentWeek = this.helperService.getCurrentWeek();
    const params = {
      page: queryParams.page || 1,
      perPage: queryParams.perPage || 100,
      startDate: queryParams.startDate || `${currentWeek[0]}<>${currentWeek[currentWeek.length - 1]}T23:59:59`,
      group: queryParams.group || null
    };
    this.isLoading = true;
    this.lessonsStore.dispatch(new lessonsActions.GetLessons(params));
  }

  selectLessonsHandler(): void {
    this.lessonsStore.select(state => state.lessons)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.events = this.modifyLessons(res.lessons);
        this.cdr.markForCheck();
      });

    this.updates
      .pipe(
        ofType(lessonsActions.LessonsActionType.GET_LESSONS_SUCCESS,
          lessonsActions.LessonsActionType.GET_LESSONS_FAILED),
        takeUntil(this.onDestroy))
      .subscribe(() => this.isLoading = false);

  }

  private fetchGroups(): void {
    const params = {
      page: 1,
      perPage: 200
    };
    this.groupsStore.dispatch(new groupsActions.GetGroups(params));
    this.groupsStore.select(state => state.groups)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.groups = res.groups;
        this.cdr.markForCheck();
      });
  }

  public selectAnotherWeek(viewDate: Date): void {
    this.currentWeekNumber = this.helperService.getWeekNumber(viewDate);
    const customDate = new Date(viewDate.toString());
    const currentWeek = this.helperService.getCurrentWeek(customDate);
    this.filtersData.startDate = `${currentWeek[0]}<>${currentWeek[currentWeek.length - 1]}T23:59:59`;
    const params = {
      startDate: this.filtersData.startDate,
      group: this.filtersData.group
    };
    this.fetchLessons(params);
  }

  public selectToday(viewDate: Date): void {
    const today = new Date();
    viewDate.setHours(today.getHours());
    viewDate.setMinutes(today.getMinutes());
    viewDate.setSeconds(today.getSeconds());
    this.selectAnotherWeek(viewDate);
  }

  public changeGroup(value: string): void {
    this.filtersData.group = (value !== this.baseFiltersType.ALL) ? value : null;
    const params = {
      startDate: this.filtersData.startDate,
      group: this.filtersData.group
    };
    this.fetchLessons(params);
  }

  private modifyLessons(lessons: Array<any>): Array<any> {
    const dataLessons = [];
    lessons.forEach(item => {
      const lesson: {[key: string]: any} = {
        start: new Date(item.startDate),
        end: new Date(item.endDate),
        title: item.subjectMatter || item.subject.name,
        meta: {
          tmpEvent: true,
        },
        color: {
          primary: colors.blue.primary,
          secondary: colors.blue.secondary
        },
        lessonData: item
        // resizable: {
        //   beforeStart: true,
        //   afterEnd: true
        // },
        // draggable: true
      };
      if (this.helperService.dateIsLess(lesson.end, new Date())) {
        lesson.cssClass = 'past-lesson';
        lesson.status = LessonsStatusType.PAST;
      }
      dataLessons.push(lesson);
    });

    return dataLessons;
  }

  private startDragToCreate(
    segment: DayViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ): void {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'Название',
      start: segment.date,
      meta: {
        tmpEvent: true,
      },
      cssClass: 'template',
      color: {
        primary: colors.blue.primary,
        secondary: colors.blue.secondary
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    };

    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate);

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
          this.createLessonHandler(dragToSelectEvent);
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = this.helperService.ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );
        const daysDiff =
          this.helperService.floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  private createLessonHandler(event: CalendarEvent): void {
    if (!event.end) {
      event.end = new Date(event.start.getTime() + 30 * 60000);
    }

    const dialogRef = this.dialog.open(CreateNewLessonComponent, {
      data: {
        title: event.title,
        start: event.start,
        end: event.end,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLessons();
      } else {
        this.events = this.events.filter(iEvent => iEvent !== event);
      }
      this.refresh();
    });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }

  public eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
  }

  public eventClicked(event: CalendarEvent): void {
    const dialogRef = this.dialog.open(EditLessonComponent, {
      data: {
        isUpdateMode: true,
        ...event
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchLessons();
      }
      this.refresh();
    });
  }
}
