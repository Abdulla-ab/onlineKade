import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  buyerIdAvailable(): boolean {
    const buyerId = localStorage.getItem('buyer_id');
    return buyerId !== null;
  }
  
  logout() : void {
    localStorage.removeItem('buyer_id');
    this.router.navigate(['/login']);
  }
}
