import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { MainPageComponent } from './main-page/main-page.component';
import { UserComponent } from './user/user.component';

import { PreferenceComponent } from './preference/preference.component';
import { AboutComponent } from './about/about.component';
import { ReqLeaveComponent } from './req-leave/req-leave.component';
import { HistoryComponent } from './history/history.component';
import { InsertUserComponent } from '../admin/insert-user/insert-user.component';
import { HistoryCancelComponent } from './history-cancel/history-cancel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutComponent,
    // canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      { path: 'user', component: UserComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'preference', component: PreferenceComponent },
      { path: 'about', component: AboutComponent },
      { path: 'reqLeave', component: ReqLeaveComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'history-cancel', component: HistoryCancelComponent },
      { path: '**', component: PageNotFoundComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
