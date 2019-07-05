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
}
