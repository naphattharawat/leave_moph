import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(
    private http: HttpClient
  ) { }

  sendCode(code) {
    return this.http.get(`http://localhost:3001/verify/getCode?code=${code}`);
  }
}
