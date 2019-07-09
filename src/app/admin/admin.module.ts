
import { MainComponent } from './main/main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HelperModule } from '../pipes/helpers.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { HolidayComponent } from './holiday/holiday.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LayoutComponent } from './layout/layout.component';
import { DepComponent } from './dep/dep.component';
import { InsertUserComponent } from './insert-user/insert-user.component';

@NgModule({
  declarations: [
    MainComponent,
    HolidayComponent,
    LeaveTypeComponent,
    LayoutComponent,
    DepComponent,
    InsertUserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule,
    MyDatePickerTHModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
