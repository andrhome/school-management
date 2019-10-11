import { NgModule } from '@angular/core';
import {
  MatMenuModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatButtonModule,
  MatDialogModule,
  MatSelectModule,
  MatCardModule,
  MatTreeModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule,
    MatTreeModule,
    MatIconModule
  ]
})
export class MaterialModule {
}
