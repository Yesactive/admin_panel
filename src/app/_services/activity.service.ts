import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// const API_URL = 'http://localhost:2022/api/admin/';
const API_URL = 'http://yesActiveApi.navson.com/api/admin/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getActivities(): Observable<any> {
    return this.http.get(API_URL + 'activity', httpOptions);
  }

  getActivityRecord(id: number): Observable<any> {
    return this.http.get(API_URL + 'activity/' + id, httpOptions);
  }

  addNewActivityRecord(dataRec): Observable<any> {
    return this.http.post(API_URL + 'activity', { dataRec }, httpOptions);
  }

  updateActivityRecord(dataRec): Observable<any> {
    return this.http.patch(API_URL + 'activity', { dataRec }, httpOptions);
  }

  deleteActivityRecord(id): Observable<any> {
    return this.http.delete(API_URL + 'activity/' + id, httpOptions);
  }
}
