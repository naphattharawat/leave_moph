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
    return this.http.get(`http://localhost:3001/user/personId?personId=${personId}`)
    .toPromise()
    .then(result => result)
    .catch(error => error);
  }

}
