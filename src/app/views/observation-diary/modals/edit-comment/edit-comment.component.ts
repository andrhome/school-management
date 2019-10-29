import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommentsService } from '@services/comments/comments.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  form: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<EditCommentComponent>,
              private commentsService: CommentsService,
              @Inject(MAT_DIALOG_DATA) public data: {[key: string]: any}) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm(): void {
    const formConfig = {
      text: [this.data.commentData.text, Validators.required],
    };
    this.form = this.fb.group(formConfig);
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public onSave(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    const comment = {
      id: this.data.commentData.id,
      text: this.form.value.text
    };
    comment[this.data.parentType] = this.data.commentData[this.data.parentType];

    this.commentsService.updateComment(comment).subscribe(
      () => {
        this.isLoading = false;
        this.dialogRef.close(comment);
      },
      error => console.log(error)
    );
  }
}
