import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/actions/cart.actions';

@Component({
  standalone : true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  imports : [CurrencyPipe, MatButtonModule, MatIconModule]
})
export class ProductCardComponent {
  @Input() product : Product

  constructor(private router: Router,
    private store: Store
  ) {}

  onViewProductDetail(){
    this.router.navigate(['/products/', this.product.id]);
  }

  addToCart(id: string, name : string) {
    this.store.dispatch(addToCart({ id , name}));
  }


}
