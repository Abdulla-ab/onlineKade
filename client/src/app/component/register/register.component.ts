import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid || this.formControls['password'].value !== this.formControls['confirmPassword'].value) {
      return;
    }

    const registerData = this.registerForm.value;

    this.http.post('http://localhost:8080/api/users/register', registerData).subscribe(
      (response) => {
        this.router.navigate(['/products']);
        this.snackBar.open('Registered successfully', 'OK', { duration: 3000 });
      },
      (error) => {
        this.snackBar.open('Your email already exists. Try a new one', 'OK', { duration: 3000 });
      }
    );
  }
}
