import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from '@components/shared-components.module';
import { InstrumentsRoutingModule } from './instruments-routing.module';
import { InstrumentsComponent } from './instruments.component';
import { AddPupilComponent } from '@views/instruments/add/add-pupil/add-pupil.component';
import { AddSchoolComponent } from './add/add-school/add-school.component';
import { AddTeacherComponent } from './add/add-teacher/add-teacher.component';
import { AddAdminComponent } from './add/add-admin/add-admin.component';
import { AddBigGroupComponent } from './add/add-big-group/add-big-group.component';
import { AddAgeCategoryComponent } from './add/add-age-category/add-age-category.component';
import { AddSubdivisionComponent } from './add/add-subdivision/add-subdivision.component';
import { AddSubjectComponent } from './add/add-subject/add-subject.component';
import { AddParentComponent } from './add/add-parent/add-parent.component';
import { AddAcademicDisciplineComponent } from './add/add-academic-discipline/add-academic-discipline.component';
import { SchoolsComponent } from './list/schools/schools.component';
import { AdminsComponent } from './list/admins/admins.component';
import { BigGroupsComponent } from './list/big-groups/big-groups.component';
import { AgeCategoriesComponent } from './list/age-categories/age-categories.component';
import { SubdivisionsComponent } from './list/subdivisions/subdivisions.component';
import { SubjectsComponent } from './list/subjects/subjects.component';
import { ParentsComponent } from './list/parents/parents.component';
import { AcademicDisciplinesComponent } from './list/academic-disciplines/academic-disciplines.component';
import { PupilsComponent } from './list/pupils/pupils.component';
import { TeachersComponent } from './list/teachers/teachers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { PupilDetailsComponent } from './list/pupils/pupil-details/pupil-details.component';
import { SchoolDetailsComponent } from './list/schools/school-details/school-details.component';
import { AdminDetailsComponent } from './list/admins/admin-details/admin-details.component';
import { BigGroupDetailsComponent } from './list/big-groups/big-group-details/big-group-details.component';
import { AgeCategoryDetailsComponent } from './list/age-categories/age-category-details/age-category-details.component';
import { SubdivisionDetailsComponent } from './list/subdivisions/subdivision-details/subdivision-details.component';
import { SubjectDetailsComponent } from './list/subjects/subject-details/subject-details.component';
import { TeacherDetailsComponent } from './list/teachers/teacher-details/teacher-details.component';

@NgModule({
  declarations: [
    InstrumentsComponent,
    AddPupilComponent,
    AddSchoolComponent,
    AddTeacherComponent,
    AddAdminComponent,
    AddBigGroupComponent,
    AddAgeCategoryComponent,
    AddSubdivisionComponent,
    AddSubjectComponent,
    AddParentComponent,
    AddAcademicDisciplineComponent,
    SchoolsComponent,
    AdminsComponent,
    BigGroupsComponent,
    AgeCategoriesComponent,
    SubdivisionsComponent,
    SubjectsComponent,
    ParentsComponent,
    AcademicDisciplinesComponent,
    PupilsComponent,
    TeachersComponent,
    PupilDetailsComponent,
    SchoolDetailsComponent,
    AdminDetailsComponent,
    BigGroupDetailsComponent,
    AgeCategoryDetailsComponent,
    SubdivisionDetailsComponent,
    SubjectDetailsComponent,
    TeacherDetailsComponent
  ],
  imports: [
    CommonModule,
    InstrumentsRoutingModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ConfirmComponent,
    SchoolDetailsComponent,
    AdminDetailsComponent,
    BigGroupDetailsComponent,
    AgeCategoryDetailsComponent,
    SubdivisionDetailsComponent,
    SubjectDetailsComponent
  ]
})
export class InstrumentsModule { }
