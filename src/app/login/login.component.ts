import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public defaultEmail: string = "admin@admin.com";
  public defaultPassword: string = "1234";


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    })
  }

  onSubmit(){
    console.log(this.loginForm.value);
    if((this.loginForm.value.email == this.defaultEmail) && (this.loginForm.value.password == this.defaultPassword)){
      console.log("HURRAY!!!");
    }
    else{
      console.log("BOOOO!!!");
    }
  }
  
}
