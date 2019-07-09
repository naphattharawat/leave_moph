import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
  ) { }

  getDep() {
    return this.http.get(`${this.apiUrl}/dep/`, {})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  createDep(data) {
    return this.http.post(`${this.apiUrl}/dep`, { data })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  editDep(depName, depId) {
    return this.http.post(`${this.apiUrl}/dep/edit`, { depName, depId })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }
}