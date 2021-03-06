import { VerifyComponent } from './verify/verify.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './user/page-not-found/page-not-found.component';
import { MainPageComponent } from './user/main-page/main-page.component';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'verify', component: VerifyComponent },
  // {path: 'main', component: MainPageComponent },
  // {path: 'verify' , component: VerifyComponent },
  // {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }


