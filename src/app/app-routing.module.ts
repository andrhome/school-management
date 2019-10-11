import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { LoginComponent } from '@views/login/login.component';
import { AuthGuard } from '@services/guards/auth.guard';
import { BasicLayoutComponent } from './layouts/basic-layout/basic-layout.component';
import { UiKitComponent } from '@components/ui-kit/ui-kit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login'
        }
      },
      {
        path: 'ui-kit',
        component: UiKitComponent,
      }
    ]
  },
  {
    path: '',
    component: BasicLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'information',
        loadChildren: './views/information/information.module#InformationModule'
      },
      {
        path: 'lessons',
        loadChildren: './views/lessons/lessons.module#LessonsModule'
      },
      {
        path: 'observation',
        loadChildren: './views/observation-diary/observation-diary.module#ObservationDiaryModule'
      },
      {
        path: 'instruments',
        loadChildren: './views/instruments/instruments.module#InstrumentsModule'
      },
      {
        path: 'planning',
        loadChildren: './views/planning/planning.module#PlanningModule'
      },
      {
        path: 'maps',
        loadChildren: './views/maps/maps.module#MapsModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
