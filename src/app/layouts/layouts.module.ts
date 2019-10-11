// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedComponentsModule } from '@components/shared-components.module';

// Components
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { BlankLayoutComponent } from './blank-layout/blank-layout.component';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    BlankLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedComponentsModule
  ]
})
export class LayoutsModule { }
