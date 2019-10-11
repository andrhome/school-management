import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from '@store/reducers/auth.reducer';
import * as pupilsReducer from '@store/reducers/pupils.reducer';
import * as lessonsReducer from '@store/reducers/lessons.reducer';
import * as schoolsReducer from '@store/reducers/schools.reducer';
import * as groupsReducer from '@store/reducers/groups.reducer';
import * as ageCategory from '@store/reducers/age-category.reducer';
import * as subdivisionsReducer from '@store/reducers/subdivisions.reducer';
import * as subjectsReducer from '@store/reducers/subjects.reducer';
import * as materialMapsReducer from '@store/reducers/material-maps.reducer';
import * as usersReducer from '@store/reducers/users.reducer';
import * as notesLearnerReducer from '@store/reducers/notes-learner.reducer';
import * as interviewsReducer from '@store/reducers/interviews.reducer';

export interface State {
  me: authReducer.State;
  pupils: pupilsReducer.State;
  lessons: lessonsReducer.State;
  schools: schoolsReducer.State;
  groups: groupsReducer.State;
  ageCategories: ageCategory.State;
  subdivisions: subdivisionsReducer.State;
  subjects: subjectsReducer.State;
  materialMaps: materialMapsReducer.State;
  users: usersReducer.State;
  notesLearner: notesLearnerReducer.State;
  interviews: interviewsReducer.State;
}

export const appReducers: ActionReducerMap<State> = {
  me: authReducer.reducer,
  pupils: pupilsReducer.reducer,
  lessons: lessonsReducer.reducer,
  schools: schoolsReducer.reducer,
  groups: groupsReducer.reducer,
  ageCategories: ageCategory.reducer,
  subdivisions: subdivisionsReducer.reducer,
  subjects: subjectsReducer.reducer,
  materialMaps: materialMapsReducer.reducer,
  users: usersReducer.reducer,
  notesLearner: notesLearnerReducer.reducer,
  interviews: interviewsReducer.reducer,
};
