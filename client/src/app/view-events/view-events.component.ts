import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit {
  itemForm!: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  eventObj: any;
  showMessage: boolean = false;
  responseMessage: string = '';
  isUpdate: boolean = false;
  eventList: any[] = [];

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getEvents();
   
  }

  initForm(): void {
    this.itemForm = this.formBuilder.group({
      searchTerm: [''],
      searchTitle: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  getEvents() {
    this.httpService.GetEvents().subscribe(
      (data) => {
        this.eventList = data;
      },
      error => {
        this.showError = true;
        this.errorMessage = error.message || 'Failed to load events';
      }
    );
  }

  
  

  searchEvent(): void {
    const searchTerm = this.itemForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.httpService.GetEventdetails(searchTerm).subscribe(
        (response) => {
          this.errorMessage = '';
          if (response.length !== 0) {
            console.log(response);
            this.eventObj = response;
            this.showMessage = true;
            this.responseMessage = 'Event found';
            this.showError = false;
            this.eventList = [response]; // Update eventList with search result
          } else {
            this.responseMessage = '';
            this.showMessage = false;
            this.showError = true;
            this.errorMessage = 'Failed to find event';
            console.error('Error searching event:', response);
          }
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Failed to find event';
          console.error('Error searching event:', error);
        }
      );
    } else {
      this.itemForm.get('searchTerm')?.markAsTouched();
    }
  }

  

  sortByTitle(): void {
    this.eventList.sort((a, b) => a.title.localeCompare(b.title));
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const eventData = this.itemForm.value;
      if (this.isUpdate && this.eventObj) {
        const updateData = {
          title: eventData.title,
          description: eventData.description,
          dateTime: eventData.dateTime,
          location: eventData.location,
          status: eventData.status
        };
        this.httpService.updateEvent(updateData, this.eventObj.eventID).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Event updated successfully.';
            this.getEvents();
            this.resetForm();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'An error occurred while updating the event: ' + error.message;
          }
        );
      } else {
        this.httpService.createEvent(eventData).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Event created successfully.';
            this.getEvents();
            this.resetForm();
          },
          (error) => {
            this.showError = true;
            this.errorMessage = 'An error occurred while creating the event: ' + error.message;
          }
        );
      }
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields.';
      this.itemForm.markAllAsTouched();
    }
  }

  edit(val: any) {
    this.isUpdate = true;
    this.eventObj = val;
    this.itemForm.patchValue({
      title: val.title,
      description: val.description,
      dateTime: new Date(val.dateTime).toISOString().slice(0, 16),
      location: val.location,
      status: val.status
    });
  }

  resetForm(): void {
    this.isUpdate = false;
    this.itemForm.reset();
    this.eventObj = null;
    this.showError = false;
    this.showMessage = false;
  }
}