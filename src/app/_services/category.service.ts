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
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get(API_URL + 'category', httpOptions);
  }

  getCategoryRecord(id: number): Observable<any> {
    return this.http.get(API_URL + 'category/' + id, httpOptions);
  }

  addNewCategoryRecord(dataRec): Observable<any> {
    return this.http.post(API_URL + 'category', { dataRec }, httpOptions);
  }

  updateCategoryRecord(dataRec): Observable<any> {
    return this.http.patch(API_URL + 'category', { dataRec }, httpOptions);
  }

  deleteCategoryRecord(id): Observable<any> {
    return this.http.delete(API_URL + 'category/' + id, httpOptions);
  }
}
