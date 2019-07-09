import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HolidayService {

    constructor(
        private http: HttpClient,
        @Inject('API_URL') private apiUrl
    ) { }

    getHoliday() {
        return this.http.post(`${this.apiUrl}/holiday`, {})
            .toPromise()
            .then(result => result)
            .catch(err => err);
    }

    insertHoliday(data) {
        return this.http.post(`${this.apiUrl}/holiday/insert-holiday`, { data })
            .toPromise()
            .then(result => result)
            .catch(err => err);
    }

    updateHoliday(data) {
        return this.http.post(`${this.apiUrl}/holiday/update-holiday`, {
            data: data
        })
            .toPromise()
            .then(result => result)
            .catch(err => err);
    }

    deleteHoliday(hId) {
        return this.http.post(`${this.apiUrl}/holiday/delete-holiday`, { hId })
            .toPromise()
            .then(result => result)
            .catch(err => err);
    }
}
