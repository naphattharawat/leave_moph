import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { LayoutComponent } from './layout/layout.component';
import { HolidayComponent } from './holiday/holiday.component';
import { DepComponent } from './dep/dep.component';
import { InsertUserComponent } from './insert-user/insert-user.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainComponent },
      { path: 'leaveType', component: LeaveTypeComponent },
      { path: 'holiday', component: HolidayComponent },
      { path: 'department', component: DepComponent },
      { path: 'insert-user', component: InsertUserComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
