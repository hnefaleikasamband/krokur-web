import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Angular Material modules to use
import {
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MatModules = [
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatSortModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatTabsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: MatModules,
  exports: MatModules
})
export class MaterialModule {}
