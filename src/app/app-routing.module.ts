import { VerifyComponent } from './verify/verify.component';
import { LoginPageComponent } from './modules/login/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './modules/main/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login' , component: LoginPageComponent },
  {path: 'verify' , component: VerifyComponent },
  {path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

