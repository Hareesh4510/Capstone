import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from '../../services/http.service';
declare var bootstrap:any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;
  usernamePattern = '^[a-z]+$';
  passwordPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,20}$';
  users$:Observable<any>=of([]);
  showError:boolean=false;
  errorMessage:any;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private bookService: HttpService,
    private router: Router,private httpService:HttpService
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(this.usernamePattern), this.uniqueValidator]],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      role: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.users$=this.httpService.getAllUsers();
    this.users$.subscribe(data=>
      {
        let arr;
        arr=data;
        if(arr)
        {
          const d=JSON.stringify(arr);
          localStorage.setItem('abcd',d);
        }

      });
    
  }

  emailValidator(control: AbstractControl): ValidationErrors | null {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(control.value)) {
      return { invalidEmailFormat: true }
    }
    return null;
  }

  uniqueValidator(control: AbstractControl): ValidationErrors | null {
    const v = control.value;
    let users = JSON.parse(localStorage.getItem('abcd') || '[]');
  if (Array.isArray(users)) {
        const usernames = users.map((user: any) => user.username);
        if (usernames.includes(v)) {
          return { notUnique: true }; // Ensure the error key is 'notUnique'
        }
      }
   return null; 
  }  
  
   
 
 




  onRegister(): void {
    if (this.itemForm.valid) {
      const usernameControl = this.itemForm.get('username');
      const usernameValue = usernameControl?.value;
 
      const uniqueUsernameError = this.uniqueValidator(usernameValue);
 
      if (uniqueUsernameError) {
        usernameControl?.setErrors(uniqueUsernameError);
        this.itemForm.markAllAsTouched();
        return;
      }
 
      this.showMessage = false;
      this.httpService.registerUser(this.itemForm.value).subscribe(data => {
        this.showMessage = true;
        this.responseMessage = `Welcome ${data.username} you are successfully registered`;
        this.router.navigateByUrl('/login');
      }, error => {
        this.showError=true;
        this.errorMessage=error.error
      });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
  
  openModal() {
    const modalElement = document.getElementById('loginModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}

