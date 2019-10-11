// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { HeaderComponent } from './header/header.component';
import { HeaderNavComponent } from './header/header-nav/header-nav.component';
import { UserBlockComponent } from './header/user-block/user-block.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentFilterComponent } from './content-filter/content-filter.component';
import { ContentBlockHeaderComponent } from './content-block-header/content-block-header.component';
import { PupilsNavComponent } from '@components/pupils-nav/pupils-nav.component';
import { DataCalendarComponent } from '@components/data-calendar/data-calendar.component';
import { SingleDatepickerComponent } from '@components/single-datepicker/single-datepicker.component';
import { AddFormNavComponent } from './add-form-nav/add-form-nav.component';
import { ListNavComponent } from './list-nav/list-nav.component';
import { ListButtonsSetComponent } from './list-buttons-set/list-buttons-set.component';
import { DefaultItemsListComponent } from './default-items-list/default-items-list.component';
import { PupilsGroupsFilterComponent } from './pupils-groups-filter/pupils-groups-filter.component';
import { HandlingListComponent } from './handling-list/handling-list.component';
import { HandlingListGroupedComponent } from './handling-list-grouped/handling-list-grouped.component';
import { DefaultPersonListComponent } from './default-person-list/default-person-list.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { ToastrModule } from 'ngx-toastr';
import { UiKitComponent } from '@components/ui-kit/ui-kit.component';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NoticeItemComponent } from './notice-item/notice-item.component';
import { NoticesListComponent } from './notices-list/notices-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PersonDetailsPageComponent } from './person-details-page/person-details-page.component';
import { SubjectsListComponent } from '@components/subjects-list/subjects-list.component';
import { PostComponent } from '@components/post/post.component';
import { DefaultDetailsPageComponent } from './default-details-page/default-details-page.component';
import { GetCategoriesStrPipe } from '@app/pipes/get-categories-str/get-categories-str.pipe';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { WeekDaysCheckboxesComponent } from '@components/week-days-checkboxes/week-days-checkboxes.component';
import { CommentItemComponent } from '@components/comment-item/comment-item.component';
import { UserRowComponent } from '@components/user-row/user-row.component';

const toastrConfig = {
  timeOut: 4000,
  positionClass: 'toast-top-right',
  progressBar: true,
};

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(toastrConfig),
    PerfectScrollbarModule,
    NgxPaginationModule
  ],
  declarations: [
    GetCategoriesStrPipe,
    HeaderComponent,
    PupilsNavComponent,
    HeaderNavComponent,
    UserBlockComponent,
    SidebarComponent,
    ContentFilterComponent,
    ContentBlockHeaderComponent,
    DataCalendarComponent,
    SingleDatepickerComponent,
    SubjectsListComponent,
    PostComponent,
    AddFormNavComponent,
    ListNavComponent,
    ListButtonsSetComponent,
    DefaultItemsListComponent,
    HandlingListComponent,
    HandlingListGroupedComponent,
    PupilsGroupsFilterComponent,
    DefaultPersonListComponent,
    ConfirmComponent,
    UiKitComponent,
    NoticeItemComponent,
    NoticesListComponent,
    PersonDetailsPageComponent,
    DefaultDetailsPageComponent,
    WeekDaysCheckboxesComponent,
    CommentsListComponent,
    CommentItemComponent,
    UserRowComponent
  ],
  exports: [
    GetCategoriesStrPipe,
    HeaderComponent,
    PupilsNavComponent,
    MaterialModule,
    SidebarComponent,
    ContentFilterComponent,
    ContentBlockHeaderComponent,
    DataCalendarComponent,
    AngularSvgIconModule,
    SingleDatepickerComponent,
    SubjectsListComponent,
    PostComponent,
    AddFormNavComponent,
    ListNavComponent,
    ListButtonsSetComponent,
    DefaultItemsListComponent,
    HandlingListComponent,
    HandlingListGroupedComponent,
    PupilsGroupsFilterComponent,
    ReactiveFormsModule,
    DefaultPersonListComponent,
    ConfirmComponent,
    UiKitComponent,
    PerfectScrollbarModule,
    NoticeItemComponent,
    NoticesListComponent,
    NgxPaginationModule,
    PersonDetailsPageComponent,
    DefaultDetailsPageComponent,
    WeekDaysCheckboxesComponent,
    CommentsListComponent,
    CommentItemComponent,
    UserRowComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedComponentsModule { }
