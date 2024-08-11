import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = `${environment.apiUrl}`;


 httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  })
};

  constructor(private http: HttpClient) {}

  login(user: Partial<any>): Observable<{ [key: string]: string }> {
    return this.http.post<{ token: string }>(
      `${this.loginUrl}/customer/login`,
      user,
      this.httpOptions
    );
  }

  getToken() {
    return localStorage.getItem("token");
  }
  getRole()
  {
    return localStorage.getItem("role");
  }
  

  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.loginUrl}/user/register`, user);
  }

  //todo: complete missing code..
}
