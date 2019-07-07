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
    return this.http
      .post(`http://localhost:3001/leave/leave-approve`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  reqLeave(data) {
    return this.http
      .post(`http://localhost:3001/reqLeave`, {
        data: data
      })
      .toPromise();
  }

  getLeaveNotApprove(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-not-approve`, { personId })

      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  leaveType() {
    return this.http
      .get(`http://localhost:3001/reqLeave`, {})
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  getLeaveWaitApprove(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-wait-approve`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveShow(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-show`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  updateLeave(dateStart, dateEnd, totalLeave, lTypeId, lSelect, lId) {
    return this.http
      .post(`http://localhost:3001/leave/updateLeave`, {
        dateStart,
        dateEnd,
        totalLeave,
        lTypeId,
        lSelect,
        lId
      })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  cancelLeave(lId) {
    return this.http
      .post(`http://localhost:3001/leave/cancelLeave`, { lId })
      .toPromise()
      .then(result => result)
      .catch(err => err);
  }

  getLeaveBoxShow(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-box-show`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }

  getLeaveBoxShowOnly(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-box-show-only`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
}
