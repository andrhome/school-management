import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { TITLES } from '@app/types/pages-titles';
import { takeUntil } from 'rxjs/operators';
import { SubjectType, UserType } from '@app/types/common.types';
import { Store } from '@ngrx/store';
import * as subjectsReducers from '@store/reducers/subjects.reducer';
import * as teachersReducers from '@store/reducers/users.reducer';
import * as subjectsActions from '@store/actions/subjects.actions';
import * as teachersActions from '@store/actions/users.actions';
import { NotesType, RolesTypes } from '@app/types/common.enums';

@Component({
  selector: 'mts-content-block-header',
  templateUrl: './content-block-header.component.html',
  styleUrls: ['./content-block-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentBlockHeaderComponent implements OnInit, OnDestroy {
  @Input() showSubjectsFilter: boolean;
  @Input() showTeachersFilter: boolean;
  @Input() showNotesTypeFilter: boolean;
  @Input() showAddAction: boolean;
  @Input() hideTitle: boolean;
  @Input() showSubjectName: boolean;
  @Input() hideLegend: boolean;
  @Input() customTitle: boolean;

  @Output() typeFilterChange = new EventEmitter<string>();
  @Output() addNewAction = new EventEmitter<string>();

  title: string;
  subjects: SubjectType[];
  teachers: UserType[];
  defaultSubjectName: number;
  defaultSubjectId: number;
  defaultTeacherId: number;
  private readonly onDestroy = new Subject<void>();
  notesType = NotesType;
  typeFilter = this.notesType.ALL;

  constructor(private route: ActivatedRoute,
              private storeSubjects: Store<subjectsReducers.State>,
              private storeTeachers: Store<teachersReducers.State>,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {

    if (!this.hideTitle) {
      this.getSectionTitle();
    }

    if (this.showSubjectsFilter) {
      this.getSubjects();
    }

    if (this.showTeachersFilter) {
      this.getTeachers();
    }

  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private getSectionTitle(): void {
    this.route.queryParams
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        this.title = TITLES[params.page] || this.customTitle;
      });
  }

  private getSubjects(): void {
    this.storeSubjects.select(state => state.subjects)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.subjects = res.subjects;
        if (res.subject) {
          this.defaultSubjectId = res.subject.id;
          this.defaultSubjectName = res.subject.name;
        }
        this.cdr.markForCheck();
      });
  }

  private getTeachers(): void {
    this.storeTeachers.select(state => state.users)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((res: { [key: string]: any }) => {
        this.teachers = res.users;
        if (res.user && res.user.id) {
          this.defaultTeacherId = (res.user.role === RolesTypes.TEACHER) ? res.user.id : -1;
        }
        this.cdr.markForCheck();
      });
  }

  private onSubjectsFilterChange(subjectId: number): void {
    const activeSubject = this.subjects.find(el => el.id === subjectId);
    this.storeSubjects.dispatch(new subjectsActions.SetSubject(activeSubject));
  }

  private onTeacherFilterChange(teacherId: number): void {
    const activeTeacher = this.teachers.find(el => el.id === teacherId) || null;
    this.storeTeachers.dispatch(new teachersActions.SetUser(activeTeacher));
  }

  public onTypeFilterChange(newType: NotesType): void {
    this.typeFilter = newType;
    this.typeFilterChange.emit(newType);
  }

  public addNew(): void {
    this.addNewAction.emit();
  }
}
