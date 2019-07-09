import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) { }
  // getLeaveTotal(personId: string) {
  //   return this.http
  //     .post(`${this.apiUrl}/leave/leave-total`, { personId })
  //     .toPromise()
  //     .then(result => result)
  //     .catch(error => error);
  // }
  getLeaveApprove(personId: string) {
    return this.http
      .post(`${this.apiUrl}/leave/leave-approve`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  reqLeave(data) {
    return this.http
      .post(`${this.apiUrl}/reqLeave`, {
        data: data
      })
      .toPromise();
  }

  getLeaveNotApprove(personId: string) {
    return this.http
      .post(`${this.apiUrl}/leave/leave-not-approve`, { personId })

      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  leaveType() {
    return this.http
      .get(`${this.apiUrl}/reqLeave`, {})
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  getLeaveWaitApprove(personId: string) {
    return this.http
      .post(`${this.apiUrl}/leave/leave-wait-approve`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveShow(personId: string) {
    return this.http
      .post(`${this.apiUrl}/leave/leave-show`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  updateLeave(data) {
    return this.http
      .post(`${this.apiUrl}/leave/updateLeave`, {
        data: data
      })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  cancelLeave(lId) {
    return this.http
      .post(`${this.apiUrl}/leave/cancelLeave`, { lId })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  getLeaveBoxShow(personId: string) {
    return this.http
      .post(`${this.apiUrl}/leave/leave-box-show`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  leaveHistoryCancel(personId: string) {
    return this.http.post(`${this.apiUrl}/leave/history-cancel`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  restoreLeave(lId) {
    return this.http.post(`${this.apiUrl}/leave/restore-leave`, { lId })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  getToday() {
    return this.http.get(`${this.apiUrl}/leave/leave-today`)
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }
}

