// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-create-event',
//   templateUrl: './create-event.component.html',
//   styleUrls: ['./create-event.component.scss']
// })
// export class CreateEventComponent implements OnInit {

//   @Output() addEvent = new EventEmitter<Event>();

//   itemForm!: FormGroup;
//   showError: boolean = false;
//   errorMessage: any;
//   eventList: any = [];
//   assignModel: any = {};
//   showMessage: any;
//   responseMessage: any;

//   constructor(private formBuilder: FormBuilder, private httpService: HttpService, private router: Router, private authService: AuthService) {
//     this.itemForm = this.formBuilder.group({
//       title: ["", Validators.required],
//       description: ["", Validators.required],
//       dateTime: ['', Validators.required],
//       location: ["", Validators.required],
//       status: ["", Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.getEvent();
//   }
//   getEvent() {
//     this.httpService.GetAllevents().subscribe((data: any) => {
//       this.eventList = data;
//     },
//       (error) => {
//         this.showError = true;
//         this.errorMessage = "Unable to create Event";
//         console.log(this.errorMessage);
//       });
//   }

//   onSubmit() {
//     if (this.itemForm.valid) {
//       this.httpService.createEvent(this.itemForm.value).subscribe(
//         data => {
//           this.itemForm.reset();
//           this.getEvent();
//         },
//         error => {
//           this.showError = true;
//           this.errorMessage = error;
//           // console.log(this.errorMessage);
//         }
//       );
//     }
//     else {
//       this.itemForm.markAllAsTouched();
//     }
//   }

  
// }
// //doto: complete missing code..



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent implements OnInit {
  itemForm: FormGroup;
  formModel:any = {status:null};
  showError:boolean = false;
  errorMessage:any;

  constructor(
    private router: Router,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Add your initialization logic here
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.httpService.createEvent(this.itemForm.value).subscribe(
        data => {
          // Handle success
           console.log('Event created:', data);
        },
        error => {
          this.errorMessage = error;
          this.showError = true;
          // console.log('Error:', error);
        }
      );
    }
  }
}
