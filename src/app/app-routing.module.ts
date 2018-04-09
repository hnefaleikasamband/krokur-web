import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthletesComponent } from './athletes/athletes.component'

const routes: Routes = [
  { path: '', component: AthletesComponent},
  //{ path: 'login', component: Login },
  //{ path: 'dashboard', component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
