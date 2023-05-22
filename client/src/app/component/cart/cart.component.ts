import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  carts: any[] = [];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts() : void {
    const buyer_id = parseInt(localStorage.getItem('buyer_id') as any, 10);
    this.http.get<any>(`http://localhost:8080/api/users/${buyer_id}`).subscribe(
      response => {
        this.carts = response.cartItems;
      },
      error => {
        console.log('Error in fetching carts:', error);
      }
    )
  }

  getTotalPrice(): number {
    return this.carts.reduce((total, cart) => total + cart.price, 0);
  }

  openFormDialog(price:number): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: {price : price}
    });

    dialogRef.afterClosed().subscribe(result => {
      
        this.buyAll(this.carts);
    });
  }

  buyAll(carts: any[]): void {
    for (const cart of carts) {
      this.buyCartItem(cart);
    }
    this.router.navigate(['/purchaseHistory']);
  }

  buyCartItem(cart: any): void {
    const buyer_id = parseInt(localStorage.getItem('buyer_id') as any, 10);
    const cartData = {
      name: cart.name,
      image: cart.image,
      description: cart.description,
      price: cart.price,
      category: cart.category,
      quantity: cart.quantity,
      buyer: {
        buyerId: buyer_id
      }
    }
    this.http.post(`http://localhost:8080/api/purchase`, cartData).subscribe(
      response => {
        this.snackBar.open("Items bought successfully", "OK", {duration: 3000});
      },
      error => {
        console.log('Error buying cart item:', error);
      }
    );
    this.http.delete(`http://localhost:8080/api/cart/${cart.cartId}`).subscribe(
      response => {
        console.log("Removed from Cart");
      },
      error => {
        console.log("Error", error);
      }
      
    )
  }

}
