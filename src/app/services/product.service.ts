import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]> {
    return this.http.get<Product[]>('product');
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`product/${id}`);
  }

  create(model : Product) : Observable<any>{
    return this.http.post<Product>(`product/`, model);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`product/${id}`)
  }

  update(id: string, model: Product): Observable<Product> {
    return this.http.put<Product>(`product/${id}`, model);
  }
}
