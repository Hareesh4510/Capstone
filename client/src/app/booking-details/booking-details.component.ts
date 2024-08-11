import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit
{
  bookingDetails$:Observable<any[]>=of([]);
  constructor(private http:HttpService,private router:ActivatedRoute)
  {

  }
  ngOnInit(): void {
    this.router.params.subscribe(res=>
      {
        const id=res['id'];
        this.getBookingDetails(id);
      });
  }
  getBookingDetails(id:any)
  {
    this.bookingDetails$=this.http.getBookingDetails(id);
  }

}
///todo: complete missing code.

  

