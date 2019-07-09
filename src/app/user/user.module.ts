import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { PreferenceComponent } from './preference/preference.component';
import { HistoryComponent } from './history/history.component';
import { HistoryCancelComponent } from './history-cancel/history-cancel.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { HelperModule } from '../pipes/helpers.module';
import { MyDatePickerTHModule } from 'mydatepicker-th';
import { ReqLeaveComponent } from './req-leave/req-leave.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    MainPageComponent,
    PageNotFoundComponent,
    AboutComponent,
    LayoutComponent,
    UserComponent,
    PreferenceComponent,
    HistoryComponent,
    HistoryCancelComponent,
    ReqLeaveComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule,
    MyDatePickerTHModule,
    UserRoutingModule
  ]
})
export class UserModule { }
