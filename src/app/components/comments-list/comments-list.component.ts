import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommentType, UserType } from '@app/types/common.types';
import { MatDialog } from '@angular/material';
import { CommentsParentType } from '@app/types/common.enums';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent {
  @Input() comments: CommentType[];
  @Input() parentType: CommentsParentType;
  @Input() currentUser: UserType;
  @Output() deleteComment = new EventEmitter<number>();

  public delComment(commentId: number): void {
    this.deleteComment.emit(commentId);
  }
}
