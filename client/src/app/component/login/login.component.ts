import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    // Make the HTTP request to your backend API using HttpClient
    this.http.post('http://localhost:8080/api/users/login', loginData).subscribe(
      (response) => {
        localStorage.setItem('buyer_id', response.toString());
        this.router.navigate(['/products']);
        this.snackBar.open('Login successful', 'OK', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Try again', 'OK', { duration: 3000 });
      }
    );
  }
}

