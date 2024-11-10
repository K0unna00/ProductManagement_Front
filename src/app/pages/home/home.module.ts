import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartComponent } from '../cart/cart.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { EllipsisPipe } from '../../pipes/ellipsis.pipe';
import { CreateProductComponent } from '../create-product/create-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@NgModule({
  declarations: [
    ProductListComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    NotFoundComponent,
    EllipsisPipe,
    CreateProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    ProductCardComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule
],
  exports : [
    HomeComponent
  ]
})
export class HomeModule { }
