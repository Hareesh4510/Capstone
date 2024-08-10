// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.development';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {
//   public serverName=environment.apiUrl;
//   //todo: complete missing code..
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public serverName=environment.apiUrl;
  //todo: complete missing code..
  constructor(private http:HttpClient){}

  
  // login():Observable<any>{
  //   return this.http.
  // }

  getBookingDetails(eventId:any):Observable<any>{
    return this.http.get(`${this.serverName}/api/client/booking-details/{eventId}`);
  }

  GetEventdetails(eventId:any):Observable<any>{
    return this.http.get(`${this.serverName}/api/staff/event-details/{eventId}`)
  }

  GetAllevents():Observable<any>{
    return this.http.get(`${this.serverName}/api/planner/events`);
  }

  GetAllResources(){
    return this.http.get(`${this.serverName}/api/planner/resources`);
  }

  createEvent(event:any):Observable<any>{
    return this.http.post(`${this.serverName}/api/user/register`,event);
  }

  updateEvent(details:any, eventId:any):Observable<any>{
    return this.http.put(`${this.serverName}/api/staff/update-setup/{eventId}`,details,eventId);
  }

  addResource(resource:any):Observable<any>{
    return this.http.post(`${this.serverName}/api/planner/resource`,resource);
  }

  allocateResources(eventId: number, resourceId: number, details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/planner/allocate-resources?eventId=${eventId}&resourceId=${resourceId}`, details);
  }

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    })
  };

  Login(user:any): Observable<any> {  //Partial<User>)
    return this.http.post(`${this.serverName}/api/user/login`,user,this.httpOptions);
  }

  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/register`, user);
  }

}


//login user
//register user

