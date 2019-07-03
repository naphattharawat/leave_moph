
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './../../services/auth-guard.service';

import { MainPageComponent } from './main-page/main-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AboutComponent } from './about/about.component';
import { LayoutComponent } from './layout/layout.component';
import { UserComponent } from './user/user.component';
import { PreferenceComponent } from './preference/preference.component';
import { LoginPageComponent } from '../login/login-page/login-page.component';
import { VerifyComponent } from 'src/app/verify/verify.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      // { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainPageComponent },
      // { path: 'login' , component: LoginPageComponent },
      { path: 'user', component: UserComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'preference', component: PreferenceComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', component: PageNotFoundComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
