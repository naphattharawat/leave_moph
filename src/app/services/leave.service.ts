import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) {}
  // getLeaveTotal(personId: string) {
  //   return this.http
  //     .post(`http://localhost:3001/leave/leave-total`, { personId })
  //     .toPromise()
  //     .then(result => result)
  //     .catch(error => error);
  // }
  getLeaveApprove(personId: string) {
    return this.http.post(`http://localhost:3001/leave/leave-approve`, {personId})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveNotApprove(personId: string) {
    return this.http.post(`http://localhost:3001/leave/leave-not-approve`, {personId})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveWaitApprove(personId: string) {
    return this.http.post(`http://localhost:3001/leave/leave-wait-approve`, {personId})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveShow(personId: string) {
    return this.http.post(`http://localhost:3001/leave/leave-show`, {personId})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveBoxShow(personId: string) {
    return this.http.post(`http://localhost:3001/leave//leave-box-show`, {personId})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

}
