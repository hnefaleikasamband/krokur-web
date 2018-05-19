import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

const routes: Routes = [{
    path: '', redirectTo: 'athletes', pathMatch: 'full'
  },{ 
    path: 'athletes', 
    loadChildren: 'app/athletes/athletes.module#AthletesModule'
  }, {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  }
  //{ path: 'login', component: Login },
  //{ path: 'dashboard', component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
