
import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public jwtHelper = new JwtHelperService();
  token: any;

  constructor(
    private router: Router
  ) { }

  canActivate() {
    this.token = sessionStorage.getItem('token');
    if (this.token) {

      console.log('token', this.token);
      if (this.jwtHelper.isTokenExpired(this.token)) {
        this.router.navigate(['login']);
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
