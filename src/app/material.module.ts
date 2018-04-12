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
    MatTabsModule } from '@angular/material';

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
        MatTabsModule
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
        MatTabsModule
    ]
})

export class MaterialModule {   }