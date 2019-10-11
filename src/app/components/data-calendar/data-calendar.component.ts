import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM.DD.YYYY',
  },
  display: {
    dateInput: 'MM.DD.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'mts-data-calendar',
  templateUrl: './data-calendar.component.html',
  styleUrls: ['./data-calendar.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class DataCalendarComponent implements OnInit {

  @Output() changeStartDate = new EventEmitter<Date>();
  @Output() changeEndDate = new EventEmitter<Date>();

  minDate = moment([2000, 0, 1]);
  maxDate = moment([2020, 0, 1]);

  dateStart = new Date();
  dateEnd = new Date();

  constructor() { }

  ngOnInit() {
    this.changeStartDate.emit(this.dateStart);
    this.changeEndDate.emit(this.dateEnd);
  }

  handleDateStart(event: MatDatepickerInputEvent<Date>): void  {
    this.changeEndDate.emit(event.value);
  }

  handleDateEnd(event: MatDatepickerInputEvent<Date>): void  {
    this.changeEndDate.emit(event.value);
  }

}
