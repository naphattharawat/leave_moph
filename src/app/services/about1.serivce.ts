import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(
    private http: HttpClient,
<<<<<<< HEAD:src/app/services/about.ts
    @Inject('API_URL') private apiUrl
=======
    @Inject("API_URL") private apiUrl
>>>>>>> 6bc7841988e4b0d1d782d4269fc6f4d30262c4d8:src/app/services/about1.serivce.ts
   ) {

}
//   getEmployeeAll(){
//     return this.http.get("http://localhost:3000/emp-info/employee-all",{})
//     .toPromise()
//     .then(result => result)
//     .catch(error=>error);
//   }

  getUserInfo(personId) {
<<<<<<< HEAD:src/app/services/about.ts
    return this.http.post('http://localhost:3001/user/user-about', {personId})
=======
    return this.http.get(`http://localhost:3001/user/user-about?personId=${personId}`)
>>>>>>> 6bc7841988e4b0d1d782d4269fc6f4d30262c4d8:src/app/services/about1.serivce.ts
    .toPromise()
    .then(result => result)
    .catch(error => error);
  }
}
