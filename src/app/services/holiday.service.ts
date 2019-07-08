import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HolidayService {

    constructor(private http: HttpClient, @Inject('API_URL') private apiUrl) { }


    reqLeave(data) {
        return this.http
            .post(`http://localhost:3001/insert-holiday`, {
                data: data
            })
            .toPromise();
    }
}

