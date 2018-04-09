import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [{
    path: '', redirectTo: 'athlete', pathMatch: 'full'
  },{ 
    path: 'athlete', 
    loadChildren: 'app/athletes/athletes.module#AthletesModule'
  },
  //{ path: 'login', component: Login },
  //{ path: 'dashboard', component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
