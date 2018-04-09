import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Angular Material modules to use
import { 
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatSortModule, } from '@angular/material';

@NgModule({
    imports: [ 
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatSortModule
    ], 
    exports: [ 
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatSortModule
    ]
})

export class MaterialModule {   }