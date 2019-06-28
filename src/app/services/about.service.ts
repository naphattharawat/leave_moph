import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
   ) {

}
//   getEmployeeAll(){
//     return this.http.get("http://localhost:3000/emp-info/employee-all",{})
//     .toPromise()
//     .then(result => result)
//     .catch(error=>error);
//   }

  getUserInfo(personId) {
    return this.http.post(`http://localhost:3001/user/user-about`, {personId})
    .toPromise()
    .then(result => result)
    .catch(error => error);
  }

  createUser(personId, hosId, email, name, surname, tel, depId, position) {
    return this.http.post(`http://localhost:3001/user/`, {
      personId, hosId, email, name, surname, tel, depId, position
    })
    .toPromise()
    .then(result => result)
    .catch(error => error);
  }
}
