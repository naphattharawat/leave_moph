import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertUserService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) {}

  getAllUser() {
    return this.http
      .get(`http://localhost:3001/user/user-all`, {})
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  createUser(personId, hosId, email, name, surname, tel, depId, position) {
    return this.http
      .post(`http://localhost:3001/user/`, {
        personId,
        hosId,
        email,
        name,
        surname,
        tel,
        depId,
        position
      })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
}
