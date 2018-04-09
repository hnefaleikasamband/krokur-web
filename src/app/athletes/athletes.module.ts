import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { AthletesRoutingModule } from './athletes-routing.module';
import { AthletesService } from '../service/athletes.service';
import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';


@NgModule({
  imports: [
    CommonModule,
    AthletesRoutingModule,
    MaterialModule,
  ],
  declarations: [AthleteListComponent, AthleteDetailComponent],
  providers: [AthletesService]
})
export class AthletesModule { }
