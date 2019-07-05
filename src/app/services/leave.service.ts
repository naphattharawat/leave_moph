import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) {}
  getLeaveTotal(personId: string) {
    return this.http
      .post(`http://localhost:3001/leave/leave-total`, { personId })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
  reqLeave(
    dateStart,
    dateEnd,
    totalLeave,
    statusHr,
    statusBoss,
    statusCeo,
    personId,
    lTypeId,
    status
  ) {
    return this.http
      .post(`http://localhost:3001/reqLeave`, {
        dateStart,
        dateEnd,
        totalLeave,
        statusHr,
        statusBoss,
        statusCeo,
        personId,
        lTypeId,
        status
      })
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
  leaveType() {
    return this.http
      .get(`http://localhost:3001/reqLeave`, {})
      .toPromise()
      .then(result => result)
      .catch(error => error);
  }
}
