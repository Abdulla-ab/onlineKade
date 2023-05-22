import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent {
  purchased_products: any[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getPurchasedProducts();
  }

  getPurchasedProducts() : void {
    const buyer_id = parseInt(localStorage.getItem('buyer_id') as any, 10);
    this.http.get<any>(`http://localhost:8080/api/users/${buyer_id}`).subscribe(
      response => {
        this.purchased_products = response.purchaseHistory;
      },
      error => {
        console.log('Error in fetching products:', error);
      }
    )
  }
}
