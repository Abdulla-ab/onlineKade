import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<FormDialogComponent>,
    private formBuilder: FormBuilder,
    private http: HttpClient, 
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.formBuilder.group({
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
      cardNumber: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.value;
    const buyer_id = parseInt(localStorage.getItem('buyer_id') as any, 10);
    const paymentData = {
      address: formData.address,
      postalCode: formData.postalCode,
      cardNumber: formData.cardNumber,
      totalPayment: this.data.price,
      buyer: {
        buyerId: buyer_id
      }
    }

    this.http.post(`http://localhost:8080/api/payment`, paymentData).subscribe(
      response => {
        this.snackBar.open('Payment successful', 'OK', { duration: 3000 });
      },
      error => {
        this.snackBar.open('Payment Not Success:', 'OK', { duration: 3000 });
      }
    );

    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
