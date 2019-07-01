import { Injectable , Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
  ) { }

  getUserInfo() {
    return this.http.get(`http://localhost:3001/dep/getDep`, {})
    .toPromise()
    .then(result => result)
    .catch(error => error);
  }
}
