import { AlertService } from './services/alert.service';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// my module and my service
import { MainModule } from './modules/main/main.module';
import { LoginModule } from './modules/login/login.module';
import { MainService } from './services/main.service';
import { HelperModule } from './pipes/helpers.module';
import { VerifyComponent } from './verify/verify.component';
import { RegisterComponent } from './modules/register/register.component';
import { AuthModule } from './auth/auth.module';
import { ReqLeaveComponent } from './req-leave/req-leave.component';
import { MainAdComponent } from './main-ad/main-ad.component';

@NgModule({
  declarations: [
    AppComponent,
    VerifyComponent,
    RegisterComponent,
    ReqLeaveComponent,
    MainAdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    MainModule,
    LoginModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule
  ],
  providers: [
    MainService,
    HelperModule,
    AlertService,
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'APPNAME', useValue: environment.appName },
    { provide: 'VERSION', useValue: environment.version },
    { provide: 'SUBVERSION', useValue: environment.subVersion }

    // { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
