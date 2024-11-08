import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../../store/reducers/cart.reducers';
import { selectCartCount } from '../../store/selectors/cart.selector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  itemCount: Observable<number>;
  
  constructor(private router : Router, private store: Store<{ cart: CartState }>) {
    this.itemCount = store.pipe(select(selectCartCount));
  }

  navigateToHome(){
    this.router.navigate([''])
  }

  navigateToProductDetail(){
    this.router.navigate(['/products/0']);
  }

  navigateToCard(){
    this.router.navigate(['/cart']);
  }
}
