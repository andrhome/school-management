import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservationDiaryComponent } from '@views/observation-diary/observation-diary.component';
import { NotesComponent } from '@views/observation-diary/notes/notes.component';
import { TrainingTopicsComponent } from '@views/observation-diary/training-topics/training-topics.component';
import { ProjectsComponent } from '@views/observation-diary/projects/projects.component';
import { MaterialsComponent } from '@views/observation-diary/materials/materials.component';
import { KisComponent } from '@views/observation-diary/kis/kis.component';
import { WorkCharacteristicComponent } from '@views/observation-diary/work-characteristic/work-characteristic.component';

const routes: Routes = [
  {
    path: '',
    component: ObservationDiaryComponent,
    children: [
      {
        path: '',
        redirectTo: 'notes',
        data: {
          title: 'Заметки'
        }
      },
      {
        path: 'notes',
        component: NotesComponent,
        data: {
          title: 'Заметки'
        }
      },
      {
        path: 'training-topics',
        component: TrainingTopicsComponent,
        data: {
          title: 'Темы занятий'
        }
      },
      {
        path: 'materials',
        component: MaterialsComponent,
        data: {
          title: 'Материалы'
        }
      },
      {
        path: 'kis',
        component: KisComponent,
        data: {
          title: 'КИС'
        }
      },
      {
        path: 'projects',
        component: ProjectsComponent,
        data: {
          title: 'Проекты'
        }
      },
      {
        path: 'work-characteristic',
        component: WorkCharacteristicComponent,
        data: {
          title: 'Характеристика работы'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationDiaryRoutingModule { }
