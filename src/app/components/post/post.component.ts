import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { InterviewType, NoteLearnerType, UserType } from '@app/types/common.types';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentsService} from '@services/comments/comments.service';
import { CommentsParentType, RolesTypes } from '@app/types/common.enums';

@Component({
  selector: 'sch-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, OnChanges {
  @Input() post: {[key: string]: any};
  @Input() postType: CommentsParentType;
  @Input() currentUser: UserType;
  @Input() hasArchivation: boolean;

  @Output() editPost = new EventEmitter<NoteLearnerType | InterviewType>();
  @Output() deletePost = new EventEmitter<NoteLearnerType | InterviewType>();
  @Output() archivePost = new EventEmitter<NoteLearnerType | InterviewType>();

  visibleComments = false;
  creatingComment = false;
  newCommentform: FormGroup;
  isLoading: boolean;
  canEdit: boolean;

  constructor(private fb: FormBuilder,
              private commentsService: CommentsService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges() {
    if (this.currentUser && this.canEdit === undefined) {
      this.canEdit = this.checkPermission();
    }
  }

  private initForm(): void {
    const formConfig = {
      text: [null, Validators.required],
    };
    this.newCommentform = this.fb.group(formConfig);
  }

  saveComment(): void | boolean {
    if (this.newCommentform.invalid) {
      return false;
    }

    const newComment = {
      text: this.newCommentform.value.text
    };
    newComment[this.postType] = this.post.id;

    this.commentsService.addComment(newComment).subscribe(
      (res) => {
        this.newCommentform.reset();
        this.post.comments.unshift(res);
        this.post.comments = [...this.post.comments];
        this.creatingComment = false;
      },
      error => console.log('err', error));
  }

  cancelCommentation(): void {
    this.creatingComment = false;
    this.newCommentform.reset();
    if (!this.post.comments.length) {
      this.visibleComments = false;
    }
  }

  private checkPermission(): boolean {
    return this.post.createdBy.id === this.currentUser.id || this.currentUser.role === RolesTypes.ADMIN;
  }

  public edit(item: NoteLearnerType | InterviewType): void {
    this.editPost.emit(item);
  }

  public delPost(item: NoteLearnerType | InterviewType): void {
    this.deletePost.emit(item);
  }

  public archive(item: NoteLearnerType | InterviewType): void {
    this.archivePost.emit(item);
  }

  public addComment(): void {
    this.creatingComment = true;
    this.visibleComments = !this.visibleComments;
  }

  private deleteComment(id: number): void {
    this.commentsService.deleteComment(id).subscribe(
      (res) => {
        this.post.comments = this.post.comments.filter(item => item.id !== id);
        this.cdr.markForCheck();
        if (!this.post.comments.length) {
          this.visibleComments = false;
        }
      },
      error => console.log('err', error));
  }
}
