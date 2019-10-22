import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NoteLearnerType, UserType } from '@app/types/common.types';
import { Store } from '@ngrx/store';
import * as actionsNotes from '@store/actions/notes-learner.actions';
import { takeUntil } from 'rxjs/operators';
import * as notesLearnerReducer from '@store/reducers/notes-learner.reducer';
import { Subject } from 'rxjs';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { MatDialog } from '@angular/material';
import { Actions, ofType } from '@ngrx/effects';
import { CreateNoteComponent } from '@views/observation-diary/modals/create-note/create-note.component';
import * as usersReducers from '@store/reducers/users.reducer';
import * as pupilsReducers from '@store/reducers/pupils.reducer';
import * as groupsReducers from '@store/reducers/groups.reducer';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import { CommentsParentType, NotesType } from '@app/types/common.enums';
import * as authReducers from '@store/reducers/auth.reducer';

@Component({
  selector: 'sch-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesComponent implements OnInit, OnDestroy {

  currentUser: UserType;
  isLoading = true;
  notes: NoteLearnerType[] = [];
  postType = CommentsParentType.NOTE;
  lastFilteredTeacher: number;
  lastFilteredPupil: number;
  lastFilteredSubject: number;
  notesType = NotesType;
  typeFilter = this.notesType.ALL;
  defParams: { [key: string]: any } = {
    page: 1,
    perPage: 100,
    type: this.typeFilter,
    learner: null,
    subject: null,
    createdBy: null,
  };
  private readonly onDestroy = new Subject<void>();

  constructor(private storeNotes: Store<notesLearnerReducer.State>,
              private storeGroups: Store<groupsReducers.State>,
              private storePupils: Store<pupilsReducers.State>,
              private storeUsers: Store<usersReducers.State>,
              private storeSubjects: Store<subjectsReducers.State>,
              public dialog: MatDialog,
              private updates: Actions,
              private cdr: ChangeDetectorRef,
              private storeAuth: Store<authReducers.State>) {
  }

  ngOnInit() {
    this.selectMeHandler();
    this.getNotesInitial();
    this.listenerUpdatesAddEditNote();
    this.listenerUpdatesDeleteNotes();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private selectMeHandler(): void {
    this.storeAuth.select(state => state.me)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.currentUser = res.me;
      });
  }

  private getNotesInitial(): void {
    this.storePupils.select(state => state.pupils)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.pupil && res.pupil.id !== this.lastFilteredPupil) {
          this.lastFilteredPupil = res.pupil.id;
          this.defParams['learner'] = this.lastFilteredPupil;
          this.dispatchNotesGet(this.defParams);
        }
      });

    this.storeUsers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.user && res.user.id !== this.lastFilteredTeacher) {
          this.lastFilteredTeacher = res.user.id;
          this.defParams['createdBy'] = this.lastFilteredTeacher;
          this.dispatchNotesGet(this.defParams);
        }
      });

    this.storeSubjects.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.subject && res.subject.id !== this.lastFilteredSubject) {
          this.lastFilteredSubject = res.subject.id;
          this.defParams['subject'] = this.lastFilteredSubject;
          this.dispatchNotesGet(this.defParams);
        }
      });

    this.storeNotes.select(state => state.notesLearner)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        if (res.total !== null) {
          this.notes = res.notesLearner;
          this.isLoading = false;
          this.cdr.markForCheck();
        }
      });
  }

  private dispatchNotesGet(params: {[key: string]: any}): void | boolean {
    params = {...params};
    for (const i in params) {
      if (params.hasOwnProperty(i) && params[i] === null) {
        return false;
      }
    }

    this.isLoading = true;
    this.cdr.markForCheck();
    switch (this.typeFilter) {
      case this.notesType.ALL: {
        delete params.type;
        delete params.subject;
        delete params.learner;
        break;
      }
      case this.notesType.OBSERVATION: {
        delete params.subject;
        break;
      }
      case this.notesType.PEDAGOGICAL: {
        delete params.learner;
        break;
      }
    }
    this.storeNotes.dispatch(new actionsNotes.GetNotesLearner(params));
  }

  private listenerUpdatesDeleteNotes(): void {
    this.updates.pipe(ofType(actionsNotes.NoteLearnerActionType.DELETE_NOTE_LEARNER_SUCCESS,
      actionsNotes.NoteLearnerActionType.DELETE_NOTE_LEARNER_FAILED))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.dispatchNotesGet(this.defParams);
      });
  }

  private listenerUpdatesAddEditNote(): void {
    this.updates.pipe(ofType(
      actionsNotes.NoteLearnerActionType.ADD_NOTE_LEARNER_SUCCESS,
      actionsNotes.NoteLearnerActionType.ADD_NOTE_LEARNER_FAILED,
      actionsNotes.NoteLearnerActionType.UPDATE_NOTE_LEARNER_SUCCESS,
      actionsNotes.NoteLearnerActionType.UPDATE_NOTE_LEARNER_FAILED
    ))
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.dispatchNotesGet(this.defParams);
      });
  }

  public createUpdateNote(note?: NoteLearnerType): void {
    const config = note ? {data: note} : null;
    this.dialog.open(CreateNoteComponent, config);
  }

  private deleteNote(noteForDelete: NoteLearnerType): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        message: `Вы действительно хотите удалить информацию о заметке "${noteForDelete.title}" ?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.isLoading = true;
        this.storeNotes.dispatch(new actionsNotes.DeleteNoteLearner(noteForDelete));
      }
    });
  }

  private archiveNote(noteForArchive: NoteLearnerType): void {
    const archive = this.notes.find(item => item.id === noteForArchive.id);
    archive['isArchived'] = !archive['isArchived'];
  }

  public typeFilterChange(type: NotesType): void {
    this.typeFilter = type;
    this.defParams['type'] = this.typeFilter;
    this.dispatchNotesGet(this.defParams);
  }

}
