import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CalendarNoticeType } from '@app/types/common.types';

@Component({
  selector: 'app-notices-list',
  templateUrl: './notices-list.component.html',
  styleUrls: ['./notices-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticesListComponent {
  @Input() notices: CalendarNoticeType[];
  @Output() removeNoticeEvent = new EventEmitter<any>();

  private removeNotice(item: CalendarNoticeType): void {
    this.removeNoticeEvent.emit(item);
  }
}
