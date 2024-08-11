import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { catchError, Observable, of, tap } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit 
{
  loginForm!: FormGroup;
  loginError$: Observable<{ [key: string]: string; }> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", Validators.required],
     
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginError$ = of({
        message: "Please make sure you have filled all the required fields",
      });
      return;
    } else {
      const { username, password } = this.loginForm.value;
      this.loginError$ = this.authService
        .login({ username, password })
        .pipe(
          tap((response) => {
            console.log(response);
            localStorage.setItem("token", response.token);
            localStorage.setItem("role",response.roles);
            localStorage.setItem("user_id",response.userId);
            console.log(localStorage.getItem("role"));
            this.router.navigate(["bank"]);
          }),
          catchError((error) => {
            console.error("Login error:", error);
            return of({ message: "Login error:"+ error });
          })
        );
    }
  }
}
//todo: complete missing code..
