import { Validators } from '@angular/forms';
import { LessonsRequestType, RepeatTermType } from '@app/types/common.enums';

export interface PupilType {
  id?: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  ageCategory: AgeCategoryType;
  group: GroupType;
  gender: string;
  dob: string;
  enrollmentDate: string;
  yearOfLearning: number;
  phone: string;
  address: string;
  active: boolean;
  health: string;
  note: string;
  email: string;
  leaderTeacher: UserType;
  contacts: string;
}

export interface LessonType {
  id?: number;
  subjectMatter?: string;
  teacher: number;
  group: number;
  subject: SubjectType;
  startDate?: string;
  endDate?: string;
  dayOfWeek: string;
  notes?: string;
  lessonLearners?: Array<any>;
  recurringObject?: {[key: string]: any};
}

export interface MultipleLessonType {
  id?: number;
  teacher: UserType;
  group: GroupType;
  subject: SubjectType;
  lessonMinHour: string;
  lessonMaxHour: string;
  recurStartDate?: string;
  recurEndDate?: string;
  type?: string;
  daysOfWeek?: Array<string>;
  updateAllFrom: string;
  recurringObject?: {[key: string]: any};
}

export interface SchoolType {
  id?: number;
  name: string;
  external: boolean;
}

export interface AgeCategoryType {
  id?: number;
  name: string;
  fromAge: number;
  toAge: number;
  active: boolean;
  subjects?: Array<any>;
  groups?: Array<GroupType>;
}

export interface SubjectType {
  id?: number;
  name: string;
  ageCategories: number[];
}

export interface UserType {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  plainPassword?: string;
  lastLogin?: string;
  enabled?: boolean;
  role: string;
  photo: string;
}

export interface MapMaterialsType {
  id?: number;
  name: string;
  ageCategory: AgeCategoryType;
  zones?: Array<any>;
}

export interface GroupType {
  id?: number;
  name: string;
  subdivision: SubdivisionType;
  ageCategory: AgeCategoryType;
  learners: Array<PupilType>;
}

export interface SubdivisionType {
  id?: number;
  name: string;
  school: SchoolType;
}

export interface NewLessonDialogData {
  title: string;
  start: Date;
  end: Date;
  isUpdateMode?: boolean;
  lessonData?: MultipleLessonType;
  teacher: UserType;
  group?: number;
  status?: string;
}

export interface EditNoteDialogData {
  title: string;
  text: string;
}

export interface CalendarNoticeType {
  id?: number;
  type: string;
  text: string;
  topic?: {[key: string]: any};
  birthdayPerson?: {[key: string]: any};
}

export interface NoteLearnerType {
  id?: number;
  type: string;
  title: string;
  text: string;
  learner: number;
  isArchived?: boolean;
  subject: {[key: string]: any};
  createdBy: {[key: string]: any};
  createdAt: string;
  updatedAt: string;
  comments: any[];
}

export interface CommentType {
  id?: number;
  note?: number;
  interview?: number;
  text: string;
  createdAt?: string;
  createdBy?: UserType;
}

export interface InterviewType {
  id?: number;
  createdBy: {[key: string]: any};
  createdAt: string;
  updatedAt: string;
  meetDate: string;
  context: string;
  arrangements: string;
  learner: number;
  schoolSideParticipants: string;
  familySideParticipants: string;
  comments: any[];
}
