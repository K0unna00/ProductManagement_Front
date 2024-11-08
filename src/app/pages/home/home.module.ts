import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { HomeComponent } from './home.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from "../../components/product-card/product-card.component";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CartComponent } from '../cart/cart.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent
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
],
  exports : [
    HomeComponent
  ]
})
export class HomeModule { }
