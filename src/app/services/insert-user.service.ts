import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsertUserService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) { }

  getAllUser() {
    return this.http
      .get(`${this.apiUrl}/user/user-all`, {})
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  createUser(
    personId,
    hosId,
    email,
    name,
    surname,
    tel,
    depId,
    position,
    genre
  ) {
    return this.http
      .post(`${this.apiUrl}/user/`, {
        personId,
        hosId,
        email,
        name,
        surname,
        tel,
        depId,
        position,
        genre
      })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
}
