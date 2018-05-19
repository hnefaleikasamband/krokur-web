import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../material.module';
import { AthleteAddEditComponent } from './athlete-add-edit/athlete-add-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [NavigationComponent, AthleteAddEditComponent],
  exports: [
    CommonModule,
    NavigationComponent,
    MaterialModule
  ],
  entryComponents: [
    AthleteAddEditComponent
  ]
})
export class SharedModule { }
