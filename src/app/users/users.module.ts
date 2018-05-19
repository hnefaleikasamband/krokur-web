import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserHomescreenComponent } from './user-homescreen/user-homescreen.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [UserHomescreenComponent]
})
export class UsersModule { }
