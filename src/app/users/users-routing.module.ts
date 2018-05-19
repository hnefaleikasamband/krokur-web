import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserHomescreenComponent } from './user-homescreen/user-homescreen.component';

const routes: Routes = [
  {
    path: '',
    component: UserHomescreenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
