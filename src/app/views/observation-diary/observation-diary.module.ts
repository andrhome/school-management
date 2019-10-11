import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservationDiaryRoutingModule } from './observation-diary-routing.module';
import { SharedComponentsModule } from '@components/shared-components.module';
import { ObservationDiaryComponent } from './observation-diary.component';
import { NotesComponent } from './notes/notes.component';
import { TrainingTopicsComponent } from './training-topics/training-topics.component';
import { ProjectsComponent } from './projects/projects.component';
import { MaterialsComponent } from '@views/observation-diary/materials/materials.component';
import { MaterialModule } from '@app/material/material.module';
import { KisComponent } from './kis/kis.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkCharacteristicComponent } from './work-characteristic/work-characteristic.component';
import { ChartsModule } from 'ng2-charts';
import { ConfirmComponent } from '@components/modals/confirm/confirm.component';
import { CreateNoteComponent } from '@views/observation-diary/modals/create-note/create-note.component';
import { EditCommentComponent } from './modals/edit-comment/edit-comment.component';
import { CreateInterviewComponent } from '@views/observation-diary/modals/create-interview/create-interview.component';

@NgModule({
  declarations: [
    CreateInterviewComponent,
    ObservationDiaryComponent,
    NotesComponent,
    TrainingTopicsComponent,
    ProjectsComponent,
    MaterialsComponent,
    KisComponent,
    WorkCharacteristicComponent,
    CreateNoteComponent,
    EditCommentComponent
  ],
  entryComponents: [
    CreateInterviewComponent,
    ConfirmComponent,
    CreateNoteComponent,
    EditCommentComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ObservationDiaryRoutingModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ChartsModule,
  ]
})
export class ObservationDiaryModule {
}
