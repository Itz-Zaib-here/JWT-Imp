import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginObj, User } from '../../modal/class';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  userList: any[] = [];

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5117/api';
  onLogin(loginObj: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/Account/login`, loginObj);
  }
  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/User`);
  }
  getCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Category`);
  }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Product`);
  }
  deleteUser(id: string) {
    return this.http.delete(`${this.apiUrl}/User?userId=${id}`, {
      responseType: 'text',
    });
  }
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/Product/${id}`, {
      responseType: 'text',
    });
  }
  saveUser(obj: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/User`, obj,{
      responseType: 'text' as 'json'
    });
  }
}
