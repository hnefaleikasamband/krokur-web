import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{
    path: '', redirectTo: 'athletes', pathMatch: 'full'
  }, { 
    path: 'athletes', 
    loadChildren: 'app/athletes/athletes.module#AthletesModule'
  }, {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  }, { 
    path: 'login', component: LoginComponent 
  }
  //{ path: 'dashboard', component: }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
