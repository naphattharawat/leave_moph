import { Injectable, Inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
  ) { }

  sendCode(code) {
    // console.log('services : ', code);
    return this.http.post(`${this.apiUrl}/verify/getCode`, {
      code: code.toString('utf8')
    })
      .toPromise();
  }

  getUser(token) {
    return this.http.get(`${this.apiUrl}/verify/getUser?token=${token}`, {
    })
      .toPromise();
  }

}
