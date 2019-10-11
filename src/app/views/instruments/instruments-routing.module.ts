import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstrumentsComponent } from '@views/instruments/instruments.component';
import { AddSchoolComponent } from '@views/instruments/add/add-school/add-school.component';
import { AddPupilComponent } from '@views/instruments/add/add-pupil/add-pupil.component';
import { AddTeacherComponent } from '@views/instruments/add/add-teacher/add-teacher.component';
import { AddAdminComponent } from '@views/instruments/add/add-admin/add-admin.component';
import { AddBigGroupComponent } from '@views/instruments/add/add-big-group/add-big-group.component';
import { AddAgeCategoryComponent } from '@views/instruments/add/add-age-category/add-age-category.component';
import { AddSubdivisionComponent } from '@views/instruments/add/add-subdivision/add-subdivision.component';
import { AddSubjectComponent } from '@views/instruments/add/add-subject/add-subject.component';
import { AddParentComponent } from '@views/instruments/add/add-parent/add-parent.component';
import { AddAcademicDisciplineComponent } from '@views/instruments/add/add-academic-discipline/add-academic-discipline.component';
import { SchoolsComponent } from '@views/instruments/list/schools/schools.component';
import { AdminsComponent } from '@views/instruments/list/admins/admins.component';
import { BigGroupsComponent } from '@views/instruments/list/big-groups/big-groups.component';
import { AgeCategoriesComponent } from '@views/instruments/list/age-categories/age-categories.component';
import { SubdivisionsComponent } from '@views/instruments/list/subdivisions/subdivisions.component';
import { SubjectsComponent } from '@views/instruments/list/subjects/subjects.component';
import { ParentsComponent } from '@views/instruments/list/parents/parents.component';
import { AcademicDisciplinesComponent } from '@views/instruments/list/academic-disciplines/academic-disciplines.component';
import { PupilsComponent } from '@views/instruments/list/pupils/pupils.component';
import { TeachersComponent } from '@views/instruments/list/teachers/teachers.component';
import { PupilDetailsComponent } from '@views/instruments/list/pupils/pupil-details/pupil-details.component';
import { TeacherDetailsComponent } from '@views/instruments/list/teachers/teacher-details/teacher-details.component';

const routes: Routes = [
  {
    path: '',
    component: InstrumentsComponent,
    data: {
      title: 'Инструменты'
    },
    children: [
      {
        path: 'add',
        children: [
          {
            path: 'school',
            component: AddSchoolComponent
          },
          {
            path: 'admin',
            component: AddAdminComponent
          },
          {
            path: 'big-group',
            component: AddBigGroupComponent
          },
          {
            path: 'age-category',
            component: AddAgeCategoryComponent
          },
          {
            path: 'subdivision',
            component: AddSubdivisionComponent
          },
          {
            path: 'subject',
            component: AddSubjectComponent
          },
          {
            path: 'parent',
            component: AddParentComponent
          },
          {
            path: 'academic-discipline',
            component: AddAcademicDisciplineComponent
          },
          {
            path: 'pupil',
            component: AddPupilComponent
          },
          {
            path: 'teacher',
            component: AddTeacherComponent
          }
        ]
      },
      {
        path: 'list',
        children: [
          {
            path: 'schools',
            component: SchoolsComponent
          },
          {
            path: 'admins',
            component: AdminsComponent
          },
          {
            path: 'big-groups',
            component: BigGroupsComponent
          },
          {
            path: 'age-categories',
            component: AgeCategoriesComponent
          },
          {
            path: 'subdivisions',
            component: SubdivisionsComponent
          },
          {
            path: 'subjects',
            component: SubjectsComponent
          },
          {
            path: 'parents',
            component: ParentsComponent
          },
          {
            path: 'academic-disciplines',
            component: AcademicDisciplinesComponent
          },
          {
            path: 'pupils',
            component: PupilsComponent
          },
          {
            path: 'pupils/:id',
            component: PupilDetailsComponent
          },
          {
            path: 'teachers',
            component: TeachersComponent
          },
          {
            path: 'teachers/:id',
            component: TeacherDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentsRoutingModule { }
