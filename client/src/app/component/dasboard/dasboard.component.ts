import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<any>('http://localhost:8080/api/products').subscribe(
      response => {
        this.products = response;
        this.filteredProducts = response;
      },
      error => {
        console.log('Error fetching products:', error);
      }
    );
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  buyerIdAvailable() {
    const buyerId = localStorage.getItem('buyer_id');
    return !!buyerId; // Returns true if buyer_id exists, false otherwise
  }

  addToCart(product: any) : void {
      const buyer_id = parseInt(localStorage.getItem('buyer_id') as any, 10);
      const product_data = {
        name : product.name,
        image : product.image,
        description : product.description,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        buyer: {
          buyerId: buyer_id
        }
      }
      this.http.post<any>(`http://localhost:8080/api/cart`, product_data).subscribe(
        response => {
          this.snackBar.open('Added To Cart', 'OK', { duration: 3000 });
        },
        error => {
          console.log('Error in adding to cart:', error);
        }
      )
  }
}
