import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteLearnerType, PupilType, SubjectType } from '@app/types/common.types';
import { takeUntil } from 'rxjs/operators';
import * as notesReducers from '@store/reducers/notes-learner.reducer';
import { Store } from '@ngrx/store';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import { Subject } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import * as actionsNote from '@store/actions/notes-learner.actions';
import { NotesType } from '@app/types/common.enums';

@Component({
  selector: 'mts-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  form: FormGroup;
  subjects: SubjectType[];
  pupils: PupilType[];
  defaultSubjectId: number;
  defaultPupilId: number;
  isLoading: boolean;
  updateMode = false;
  notesType = NotesType;
  defaultType = this.notesType.OBSERVATION;
  private readonly onDestroy = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<CreateNoteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: NoteLearnerType,
              private storeSubjects: Store<subjectsReducers.State>,
              private storeNotes: Store<notesReducers.State>,
              private storePupils: Store<pupilsReducers.State>,
              private fb: FormBuilder,
              private updates: Actions) {
  }

  ngOnInit() {
    this.updateMode = !!this.data;
    this.initForm();
    if (!this.updateMode) {
      this.getSubjects();
      this.getPupils();
    }
  }

  private initForm(): void {
    let formConfig;
    if (this.updateMode) {
      formConfig = {
        title: [this.data.title, Validators.required],
        text: [this.data.text, Validators.required],
      };
    } else {
      formConfig = {
        type: [this.defaultType, Validators.required],
        title: [null, Validators.required],
        text: [null, Validators.required],
        subject: [null],
        learner: [null],
      };
    }

    this.form = this.fb.group(formConfig);
  }

  private getSubjects(): void {
    this.storeSubjects.select(state => {
      return state.subjects;
    })
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subjects = res.subjects;
        if (res.subject) {
          const subject = this.defaultType === this.notesType.PEDAGOGICAL ? this.defaultSubjectId : null;
          this.defaultSubjectId = res.subject.id;
          this.form.controls['subject'].setValue(subject);
        }
      });
  }

  private getPupils(): void {
    this.storePupils.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.pupils = res.pupils;
        if (res.pupil) {
          const learner = this.defaultType === this.notesType.OBSERVATION ? this.defaultPupilId : null;
          this.defaultPupilId = res.pupil.id;
          this.form.controls['learner'].setValue(learner);
        }
      });
  }

  private onTypeChange(type: string): void {
    if (type === this.notesType.OBSERVATION) {
      this.form.controls['subject'].reset();
      this.form.controls['learner'].setValue(this.defaultPupilId);

    } else if (type === this.notesType.PEDAGOGICAL) {
      this.form.controls['learner'].reset();
      this.form.controls['subject'].setValue(this.defaultSubjectId);
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  private addNoteHandler(note: NoteLearnerType): void {
    this.storeNotes.dispatch(new actionsNote.AddNoteLearner(note));
    this.updates.pipe(ofType(actionsNote.NoteLearnerActionType.ADD_NOTE_LEARNER_SUCCESS,
      actionsNote.NoteLearnerActionType.ADD_NOTE_LEARNER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.isLoading = false;
        if (res.type === actionsNote.NoteLearnerActionType.ADD_NOTE_LEARNER_SUCCESS) {
          this.dialogRef.close('success');
        }
      });
  }

  private updateNoteHandler(note: NoteLearnerType): void {
    this.storeNotes.dispatch(new actionsNote.UpdateNoteLearner(note));
    this.updates.pipe(ofType(actionsNote.NoteLearnerActionType.UPDATE_NOTE_LEARNER_SUCCESS,
      actionsNote.NoteLearnerActionType.UPDATE_NOTE_LEARNER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.isLoading = false;
        if (res.type === actionsNote.NoteLearnerActionType.UPDATE_NOTE_LEARNER_SUCCESS) {
          this.dialogRef.close('success');
        }
      });
  }

  public onSave(): void {

    if (this.form.invalid) {
      return;
    }

    const note = this.form.value;
    this.isLoading = true;
    if (this.updateMode) {
      note.id = this.data.id;
      note.learner = this.data.learner;
      note.subject = this.data.subject ? this.data.subject.id : null;
      this.updateNoteHandler(note);
    } else {
      this.addNoteHandler(note);
    }
  }
}
