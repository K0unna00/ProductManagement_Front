import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from '../models/product.model';
import { BaseService } from './base.service';
import { map } from 'rxjs';
import { ApiResponse } from '../models/apiResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(http : HttpClient) {
    super(http);
  }

  getProducts() {
    return this.get<ProductDTO[]>(`product/`);
  }

  getById(id: string) {
    return this.get<ProductDTO>(`product/${id}`);
  }

  createProduct(model : FormData) {
    return this.post<FormData>(`product/`, model);
  }

  deleteProduct(id: string){
    return this.delete(`product/${id}`)
  }

  updateProduct(id: string, model: FormData) {
    return this.update<FormData>(`product/${id}`, model);
  }

  getByIds(ids : string[]) {

    return this.http.post<ApiResponse<ProductDTO[]>>(`product/getByIds`, ids).pipe(
      map(response => {
        if (response.isSuccess) {
          return response.data;
        } else {
          throw new Error(response.errorMessage);
        }
      }),
    );
  }
}
