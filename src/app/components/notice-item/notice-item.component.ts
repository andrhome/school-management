import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { CalendarNoticeType } from '@app/types/common.types';

@Component({
  selector: 'sch-notice-item',
  templateUrl: './notice-item.component.html',
  styleUrls: ['./notice-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NoticeItemComponent {
  @Input() notice: CalendarNoticeType;
  @Output() removeNoticeEvent = new EventEmitter<any>();
  public removeNotice(item: CalendarNoticeType): void {
    this.removeNoticeEvent.emit(item);
  }
}
