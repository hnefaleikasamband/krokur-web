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
    MatAutocompleteModule } from '@angular/material';

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
    MatAutocompleteModule
];

@NgModule({
    imports: [ 
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
        MatAutocompleteModule
    ], 
    exports: [ 
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
        MatAutocompleteModule
    ]
})

export class MaterialModule {   }