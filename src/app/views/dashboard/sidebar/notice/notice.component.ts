import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CalendarNoticeType } from '@app/types/common.types';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {

  isLoading: boolean;
  notices: CalendarNoticeType[];
  fakeNotices = [
    {
      id: 11,
      type: 'calendar',
      text: 'На завтра запланирована тема',
      topic: {
        id: 12,
        name: 'Название темы'
      },
    },
    {
      id: 21,
      type: 'birthday',
      text: 'Завтра празднует свой день рождения',
      birthdayPerson: {
        id: 12,
        name: 'Абгарян Нина'
      },
    },
    {
      id: 12,
      type: 'calendar',
      text: 'На завтра запланирована тема',
      topic: {
        id: 13,
        name: 'Название теeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeмы-2'
      },
    }
  ];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getCalendarNotices();
  }

  private getCalendarNotices(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.cdr.markForCheck();
      this.notices = this.fakeNotices;
      this.isLoading = false;
    }, 1000);
  }

  public removeNotice(itemToDelete: CalendarNoticeType): void {
    this.notices = this.notices.filter(item => item !== itemToDelete);
  }
}
