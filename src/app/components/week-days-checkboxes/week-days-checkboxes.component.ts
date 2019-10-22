import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LessonType } from '@app/types/common.types';

@Component({
  selector: 'sch-week-days-checkboxes',
  templateUrl: './week-days-checkboxes.component.html',
  styleUrls: ['./week-days-checkboxes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekDaysCheckboxesComponent implements OnInit {
  @Input() lesson: LessonType;
  @Output() getRepeatDays = new EventEmitter<Array<string>>();
  days: Array<any> = [
    {value: '1', label: 'Пн', checked: false},
    {value: '2', label: 'Вт', checked: false},
    {value: '3', label: 'Ср', checked: false},
    {value: '4', label: 'Чт', checked: false},
    {value: '5', label: 'Пт', checked: false},
    {value: '6', label: 'Сб', checked: false},
    {value: '0', label: 'Вс', checked: false}
  ];

  constructor() { }

  ngOnInit() {
    this.initData();
  }

  getDays(): void {
    const checkedDays = this.days.filter(day => day.checked);
    const daysValues = checkedDays.map(day => day.value);
    this.getRepeatDays.emit(daysValues);
  }

  initData(): void {
    if (!this.lesson || !this.lesson.recurringObject.daysOfWeek.length) {
      return;
    }
    this.days.forEach(day => {
      this.lesson.recurringObject.daysOfWeek.forEach(item => {
        if (day.value === item) {
          day.checked = true;
        }
      });
    });
  }

}
