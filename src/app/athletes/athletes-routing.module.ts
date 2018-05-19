import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AthleteListComponent } from './athlete-list/athlete-list.component';
import { AthleteDetailComponent } from './athlete-detail/athlete-detail.component';
import { AthleteHomescreenComponent } from './athlete-homescreen/athlete-homescreen.component'
import { AthleteBoutsComponent } from './athlete-bouts/athlete-bouts.component';

const routes: Routes = [ {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },{
    path: 'list',
    component: AthleteListComponent
  }, {
    path: 'detail',
    component: AthleteDetailComponent
  }, {
    path: 'home',
    component: AthleteHomescreenComponent
  }, {
    path: 'bouts',
    component: AthleteBoutsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthletesRoutingModule { }
