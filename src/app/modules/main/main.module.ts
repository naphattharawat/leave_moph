import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { MainRoutingModule } from './main-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { PreferenceComponent } from './preference/preference.component';
import { HelperModule } from 'src/app/pipes/helpers.module';
import { HistoryComponent } from './history/history.component';
import { MyDatePickerModule } from 'mydatepicker';
import { HistoryCancelComponent } from './history-cancel/history-cancel.component';
<<<<<<< HEAD
import { InsertUserComponent } from 'src/app/insert-user/insert-user.component';
=======
import { LeaveTypeComponent } from 'src/app/leave-type/leave-type.component';

>>>>>>> 73fcd99a5a7649795351b1fcb6081f5a2018380d

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
<<<<<<< HEAD
    InsertUserComponent
=======
    LeaveTypeComponent
>>>>>>> 73fcd99a5a7649795351b1fcb6081f5a2018380d
  ],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    HelperModule,
    MainRoutingModule,
    MyDatePickerModule
  ]
})
export class MainModule {}
