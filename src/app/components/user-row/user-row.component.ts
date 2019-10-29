import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UserType } from '@app/types/common.types';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRowComponent {
  @Input() user: UserType;
  photoPlaceholder = 'url(assets/images/no-photo.png)';
}
