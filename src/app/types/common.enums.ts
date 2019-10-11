export enum RolesTypes {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  USER = 'user',
  ALL = 'all',
}

export enum UnitItemType {
  ACADEMIC_DISCIPLINE = 'academic-discipline',
  ADMIN = 'admin',
  AGE_CATEGORY = 'age-category',
  BIG_GROUP = 'big-group',
  MAP_MATERIALS = 'map-materials',
  PARENT = 'parent',
  PUPIL = 'pupil',
  SCHOOL = 'school',
  SUBDIVISION = 'subdivision',
  SUBJECT = 'subject',
  TEACHER = 'teacher'
}

export enum PluralItemsType {
  ACADEMIC_DISCIPLINES = 'academic-disciplines',
  ADMINS = 'admins',
  AGE_CATEGORIES = 'age-categories',
  BIG_GROUPS = 'big-groups',
  MAPS_MATERIALS = 'maps-materials',
  PARENTS = 'parents',
  PUPILS = 'pupils',
  SCHOOLS = 'schools',
  SUBDIVISIONS = 'subdivisions',
  SUBJECTS = 'subjects',
  TEACHERS = 'teachers'
}

export enum LessonsRequestType {
  WEEKLY = 'weekly'
}

export enum BaseFiltersType {
  ALL = 'all'
}

export enum LocalLessonsType {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

export enum LessonsStatusType {
  PAST = 'past'
}

export enum RepeatTermType {
  NO_REPEAT = 'notRepeat',
  EVERY_DAY = 'everyDay',
  ON_WEEKDAYS = 'onWeekdays',
  EVERY_WEEK = 'everyWeek',
  CUSTOM_PERIOD = 'customPeriod'
}

export enum DeleteLessonCategoryType {
  ONLY_ONE = 'onlyOne',
  ALL = 'all'
}

export enum ObservationType {
  BY_GROUP = 'byGroup',
  BY_PUPIL = 'byPupil',
}

export enum NotesType {
  ALL = 'all',
  OBSERVATION = 'observation',
  PEDAGOGICAL = 'pedagogical',
  GROUP = 'group',
}

export enum CommentsParentType {
  NOTE = 'note',
  INTERVIEW = 'interview',
}
