import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products : Product[];
  
  constructor(private productService : ProductService) {
  }

  async ngOnInit() {
    this.products = await lastValueFrom(this.productService.get())
  }

}
