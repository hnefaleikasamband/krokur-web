import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { AthletesRoutingModule } from './athletes-routing.module';
import { AthletesService } from '../service/athletes.service';
import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';
import { AthleteBoutsComponent } from './athlete-bouts/athlete-bouts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AthleteHomescreenComponent } from './athlete-homescreen/athlete-homescreen.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    AthletesRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [AthleteListComponent, AthleteDetailComponent, AthleteBoutsComponent, AthleteHomescreenComponent],
  providers: [AthletesService]
})
export class AthletesModule { }
