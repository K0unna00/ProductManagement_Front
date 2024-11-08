import { Component } from '@angular/core';
import { Product } from '../../models/product.model';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducers';
import { selectCartCount, selectCartItems } from '../../store/selectors/cart.selector';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  isAnyItem : boolean;
  products : Product[];
  items: {id : string, name: string}[];
  
  constructor(private router : Router, private store: Store<{ cart: CartState }>,
    private productService : ProductService
  ) {}

  async ngOnInit(){
      this.items = await firstValueFrom(this.store.pipe(select(selectCartItems)));

      if(this.items.length > 0){
        this.isAnyItem = true;
        const ids = this.items.map((item) => item.id )
        this.products = await lastValueFrom(this.productService.getByIds(ids));
      }
  }
}
