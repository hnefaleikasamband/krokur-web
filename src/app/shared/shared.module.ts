import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { MaterialModule } from '../material.module';
import { AthleteAddEditComponent } from './athlete-add-edit/athlete-add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSingleBoutComponent } from './add-single-bout/add-single-bout.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [
    NavigationComponent,
    AthleteAddEditComponent,
    AddSingleBoutComponent
  ],
  exports: [
    CommonModule,
    NavigationComponent,
    MaterialModule,
    AddSingleBoutComponent
  ],
  entryComponents: [AthleteAddEditComponent]
})
export class SharedModule {}
