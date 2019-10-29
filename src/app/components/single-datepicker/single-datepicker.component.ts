import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-single-datepicker',
  templateUrl: './single-datepicker.component.html',
  styleUrls: ['./single-datepicker.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class SingleDatepickerComponent implements OnInit {
  @Input() outline: boolean;
  @Input() initialDate = new Date();
  @Output() selectDate = new EventEmitter<Date>();

  constructor() { }

  ngOnInit() {
  }

  public handleDateChange(date: Date): void  {
    this.selectDate.emit(date);
  }
}
