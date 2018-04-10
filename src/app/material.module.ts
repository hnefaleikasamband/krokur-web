import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Angular Material modules to use
import { 
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatCardModule } from '@angular/material';

@NgModule({
    imports: [ 
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatCardModule
    ], 
    exports: [ 
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        MatCardModule
    ]
})

export class MaterialModule {   }