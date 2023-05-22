import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ProductsComponent } from './component/products/products.component';
import { DashboardComponent } from './component/dasboard/dasboard.component';
import { CartComponent } from './component/cart/cart.component';
import { PurchaseHistoryComponent } from './component/purchase-history/purchase-history.component';

const routes: Routes = [
  {path: '', redirectTo: '/products', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'products', component: DashboardComponent},
  {path: 'cart', component: CartComponent},
  {path: 'purchaseHistory', component: PurchaseHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
