import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jobreq } from '../models/jobreq.model';
const baseUrl = 'http://localhost:8080/api/jobreqs'

@Injectable({
  providedIn: 'root'
})
export class JobreqService {

  constructor(private http: HttpClient) { }
  getAll(params: any): Observable<any> {
    return this.http.get<any>(baseUrl , { params });
  }
  get(id: any): Observable<Jobreq> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }
  findByTitle(title: any): Observable<Jobreq[]> {
    return this.http.get<Jobreq[]>(`${baseUrl}?title=${title}`);
  }
}
