import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'athletes',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'athletes',
    loadChildren: 'app/athletes/athletes.module#AthletesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule',
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  // { path: 'dashboard', component: }

  { path: '**', redirectTo: 'athletes' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
