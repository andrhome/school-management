// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { ViewsModule } from '@views/views.module';
import { HttpReqInterceptor } from '@services/http-req-interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Components
import { AppComponent } from './app.component';
import { appReducers } from '@store/reducers';
import { AuthEffects } from '@store/effects/auth.effects';
import { PupilsEffects } from '@store/effects/pupils.effects';
import { LessonsEffects } from '@store/effects/lessons.effects';
import { SchoolsEffects } from '@store/effects/schools.effects';
import { AgeCategoryEffects } from '@store/effects/age-category.effects';
import { GroupsEffects } from '@store/effects/groups.effects';
import { SubdivisionsEffects } from '@store/effects/subdivisions.effects';
import { SubjectsEffects } from '@store/effects/subjects.effects';
import { MaterialMapsEffects } from '@store/effects/material-maps.effects';
import { UsersEffects } from '@store/effects/users.effects';
import { NotesLearnerEffects } from '@store/effects/notes-learner.effects';
import { InterviewsEffects } from '@store/effects/interviews.effects';

const effects = [
  AuthEffects,
  PupilsEffects,
  LessonsEffects,
  SchoolsEffects,
  AgeCategoryEffects,
  GroupsEffects,
  SubdivisionsEffects,
  SubjectsEffects,
  MaterialMapsEffects,
  UsersEffects,
  NotesLearnerEffects,
  InterviewsEffects,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutsModule,
    ViewsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpReqInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
