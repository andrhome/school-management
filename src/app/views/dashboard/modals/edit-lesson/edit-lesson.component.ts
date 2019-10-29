import { Component, Inject, OnInit } from '@angular/core';
import { AgeCategoryType, NewLessonDialogData } from '@app/types/common.types';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { CustomFormatterProvider } from '@views/dashboard/schedule/custom-formatter.provider';
import { CalendarDateFormatter } from 'angular-calendar';
import { AddMaterialsComponent } from '@views/dashboard/modals/add-materials/add-materials.component';
import { CreateNewLessonComponent } from '@views/dashboard/modals/create-new-lesson/create-new-lesson.component';
import { DeleteLessonComponent } from '@views/dashboard/modals/delete-lesson/delete-lesson.component';
import { LessonsStatusType } from '@app/types/common.enums';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.scss'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomFormatterProvider
    }
  ],
})

export class EditLessonComponent implements OnInit {
  configScrollbar = {};
  isLoading: boolean;
  ageCategories: AgeCategoryType[];
  teacher = {
    name: 'Пермякова Ольга',
    photo: 'assets/images/placeholder_avatar_3.jpg'
  };
  showPupilsList = true;
  locale = 'ru';
  pupils = {
    id: []
  };
  selectedPupils = [];
  lessonsStatusType = LessonsStatusType;

  constructor(public editDialog: MatDialogRef<EditLessonComponent>,
              @Inject(MAT_DIALOG_DATA) public modalData: NewLessonDialogData,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getPupilsByGroup(this.modalData.group);
  }

  private getPupilsByGroup(groupId: number): void {
    // this.isLoading = true;
    // for (let i = 1; i <= 20; i++) {
    //   this.pupils[i] = {
    //     name: 'Бебебешкин Самуил -' + i,
    //     invited: false,
    //     waiting: false
    //   };
    //   this.pupils.id.push(i);
    // }
    // this.isLoading = false;
  }

  public onClose(): void {
    this.editDialog.close();
  }

  public deleteLessonHandler(lesson: {[key: string]: any}): void {
    const dialogRef = this.dialog.open(DeleteLessonComponent, {
      data: {
        ...lesson
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editDialog.close(result);
    });
  }

  public editLesson(lesson: {[key: string]: any}): void {
    const dialogRef = this.dialog.open(CreateNewLessonComponent, {
      data: {
        ...lesson
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.editDialog.close(result);
    });
  }

  public onAddMaterial(name: string): void {
    this.dialog.open(AddMaterialsComponent, {
      data: {
        lessonId: name,
        title: name,
      }
    });
  }

  private toggleVisiting(id: number): void {
    this.pupils[id].waiting = true;
    setTimeout(() => {
      const savedIndex = this.selectedPupils.findIndex(idSaved => idSaved === id);
      if (savedIndex === -1) {
        this.selectedPupils.push(id);
      } else {
        this.selectedPupils.splice(savedIndex, 1);
      }
      this.pupils[id].waiting = false;
      this.pupils[id].invited = !this.pupils[id].invited;
    }, 2000);
  }
}
