import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteListComponent } from './athlete-list/athlete-list.component';

const routes: Routes = [
  {
    path: '',
    component: AthleteListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthletesRoutingModule { }
