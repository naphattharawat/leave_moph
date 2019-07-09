import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
  ) { }

  getpersonId(personId: string) {
    return this.http.get(`${this.apiUrl}/user/personId?personId=${personId}`)
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  updateUser(tel: string, email: string, personId: string) {
    return this.http.post(`${this.apiUrl}/user/update`, { tel, email, personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

}
