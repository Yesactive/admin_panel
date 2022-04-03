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
export class MembersService {
  constructor(private http: HttpClient) { }

  getMembers(): Observable<any> {
    return this.http.get(API_URL + 'members', httpOptions);
  }

  getMemberRecord(id: number): Observable<any> {
    return this.http.get(API_URL + 'members/' + id, httpOptions);
  }

  addNewMemberRecord(dataRec): Observable<any> {
    return this.http.post(API_URL + 'members', { dataRec }, httpOptions);
  }

  updateMemberRecord(dataRec): Observable<any> {
    return this.http.patch(API_URL + 'members', { dataRec }, httpOptions);
  }

  deleteMemberRecord(id): Observable<any> {
    return this.http.delete(API_URL + 'members/' + id, httpOptions);
  }
}