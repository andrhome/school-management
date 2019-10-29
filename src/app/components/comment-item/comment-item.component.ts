import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommentType, UserType } from '@app/types/common.types';
import { CommentsParentType, RolesTypes } from '@app/types/common.enums';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { EditCommentComponent } from '@views/observation-diary/modals/edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnChanges {
  @Input() comment: CommentType;
  @Input() currentUser: UserType;
  @Input() parentType: CommentsParentType;

  @Output() deleteComment = new EventEmitter<number>();
  canEdit: boolean;

  constructor(public dialog: MatDialog,
              private cdr: ChangeDetectorRef) {  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentUser'] && this.canEdit === undefined) {
      this.canEdit = this.checkPermission();
    }
  }

  private checkPermission(): boolean {
    return this.comment.createdBy.id === this.currentUser.id || this.currentUser.role === RolesTypes.ADMIN;
  }

  public editComment(): void {
    const dialogRef = this.dialog.open(EditCommentComponent, {
      data: {
        parentType: this.parentType,
        commentData: this.comment,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.comment.text = result.text;
        this.cdr.markForCheck();
      }
    });
  }

  public delComment(comment: CommentType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить комментарий "${comment.text}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteComment.emit(comment.id);
      }
    });
  }

}
