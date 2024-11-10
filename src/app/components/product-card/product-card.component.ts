import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductDTO } from '../../models/product.model';
import { Router } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/actions/cart.actions';
import { FilePaths } from '../../constants/FilePath';

@Component({
  standalone : true,
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  imports : [CurrencyPipe, MatButtonModule, MatIconModule, NgIf]
})
export class ProductCardComponent implements OnInit{
  @Input() product : ProductDTO
  @Input() isViewMode : boolean ;
  imgPreview : string;

  constructor(private router: Router,
    private store: Store
  ) {}


  ngOnInit(): void {
    this.imgPreview = FilePaths.MAIN_FILE_PATH + this.product.imgPath;
  }

  onViewProductDetail(){
    this.router.navigate(['/products/', this.product.id]);
  }

  addToCart(id: string, name : string) {
    this.store.dispatch(addToCart({ id , name}));
  }


}
