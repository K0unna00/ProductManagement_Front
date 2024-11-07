import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducers';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  cartCount$: Observable<number>;
  
  constructor(private router : Router,
    private store: Store<{ cart: CartState }>) {
    this.cartCount$ = store.pipe(select('cart', 'count'));
  }

  navigateToHome(){
    this.router.navigate([''])
  }

  navigateToProductDetail(){
    this.router.navigate(['/products/0']);
  }
}