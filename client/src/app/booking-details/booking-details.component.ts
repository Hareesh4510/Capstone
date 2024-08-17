import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {
 
  itemForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  eventObj: any[] = [];
  showMessage: boolean = false;
  responseMessage: string = '';
  searchPerformed: boolean = false;
 
  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      searchTerm: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    // Initialize form
  }
 
  searchEvent(): void {
    if (this.itemForm.valid) {
      const searchTerm = this.itemForm.get('searchTerm')?.value;
      this.httpService.getBookingDetails(searchTerm).subscribe(
        (response) => {
          this.searchPerformed = true;
          if (response && Object.keys(response).length !== 0) {
            this.eventObj = [response];
            this.showMessage = true;
            this.responseMessage = 'Event found';
            this.showError = false;
          } else {
            this.eventObj = [];
            this.showMessage = false;
            this.showError = true;
            this.errorMessage = 'No event found';
          }
        },
        (error) => {
          this.searchPerformed = true;
          this.showError = true;
          this.errorMessage = 'Failed to find event';
          this.eventObj = [];
          console.error('Error searching event:', error);
        }
      );
    } else {
      this.itemForm.get('searchTerm')?.markAsTouched();
    }
  }
}
