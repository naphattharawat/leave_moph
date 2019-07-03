import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public jwtHelper = new JwtHelperService();
  token: any;

  constructor(private route: Router) { }

  canActivate() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {
      
     if (this.jwtHelper.isTokenExpired(this.token)) {
        this.route.navigate(['login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.route.navigate(['login']);
      return false;
    }
  }

}
