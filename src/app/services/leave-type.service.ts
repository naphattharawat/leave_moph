import { Injectable , Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {

  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl
  ) { }

  getLeaveType() {
    return this.http.get(`http://localhost:3001/leaveType`, {})
    .toPromise()
    .then(result => result)
    .catch(err => err);
  }

  insertLeaveType(data) {
    return this.http.post(`http://localhost:3001/leaveType`, {data})
    .toPromise()
    .then(result => result)
    .catch(err => err);
  }

  updateLeaveType(lTypeName, is_total, lTypeId) {
    return this.http.post(`http://localhost:3001/leaveType/update`, {lTypeName, is_total, lTypeId})
    .toPromise()
    .then(result => result)
    .catch(err => err);
  }

  delLeaveType(lTypeId) {
    return this.http.post(`http://localhost:3001/leaveType/del`, {lTypeId})
    .toPromise()
    .then(result => result)
    .catch(err => err);
  }
}
