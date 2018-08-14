import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material'

import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  
  public defaultEmail: string = "admin@admin.com";
  public defaultPassword: string = "1234";
  
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]]
    })

    // If user is logged in and manually goes to /login we will log the user
    // out and make them login again in case a new user is trying to log in.
    this.authService.logout();

      // Save the return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){
    console.log(this.loginForm.value);


    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate([this.returnUrl]);
            this.snackBar.open('','', { duration: 2000 })
        },
        error => {
            this.loading = false;
            console.log(error);
            this.snackBar.open('Unable to sign in, please try again.','X', { duration: 4000});
        });

  }
  
}
