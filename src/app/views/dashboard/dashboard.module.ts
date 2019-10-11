import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { MaterialModule } from '@app/material/material.module';
import { SharedComponentsModule } from '@components/shared-components.module';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ScheduleComponent } from './schedule/schedule.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { DashboardComponent } from './dashboard.component';

import { NoticeComponent } from './sidebar/notice/notice.component';
import { ReportComponent } from './sidebar/report/report.component';
import { FilesComponent } from './sidebar/files/files.component';
import { TopicComponent } from './sidebar/topic/topic.component';
import { CreateNewLessonComponent } from '@views/dashboard/modals/create-new-lesson/create-new-lesson.component';
import { EditLessonComponent } from '@views/dashboard/modals/edit-lesson/edit-lesson.component';
import { AddMaterialsComponent } from '@views/dashboard/modals/add-materials/add-materials.component';
import { RenameLessonComponent } from '@views/dashboard/modals/rename-lesson/rename-lesson.component';
import { EditLessonsSetComponent } from './modals/edit-lessons-set/edit-lessons-set.component';
import { DeleteLessonComponent } from './modals/delete-lesson/delete-lesson.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    DashboardComponent,
    NoticeComponent,
    ReportComponent,
    FilesComponent,
    TopicComponent,
    ScheduleComponent,
    CreateNewLessonComponent,
    EditLessonComponent,
    AddMaterialsComponent,
    RenameLessonComponent,
    EditLessonsSetComponent,
    DeleteLessonComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MaterialModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  entryComponents: [
    CreateNewLessonComponent,
    EditLessonComponent,
    AddMaterialsComponent,
    RenameLessonComponent,
    EditLessonsSetComponent,
    DeleteLessonComponent
  ]
})
export class DashboardModule {
}
