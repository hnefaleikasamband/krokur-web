import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';

const routes: Routes = [ {
    path: '', redirectTo: 'list', pathMatch: 'full'
  },{
    path: 'list',
    component: AthleteListComponent
  }, {
    path: 'detail',
    component: AthleteDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthletesRoutingModule { }