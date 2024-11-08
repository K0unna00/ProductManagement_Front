import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  form: FormGroup;
  currentId : string;
  currentData : Product;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private route : ActivatedRoute,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.setupForm();
    this.getParams();
  }

  setupForm(){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3) , Validators.maxLength(20)]],
      description: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(40)]],
      price : ['', [Validators.required, Validators.min(1)] ],
    });
  }

  getParams(){
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('id'); 
      if(this.currentId != '0'){
        this.getProductById(this.currentId);
      }
    });
  }

  async getProductById(id: string){
    try{
      let data = await lastValueFrom(this.productService.getById(id));

      this.currentData = data;
  
      this.form.patchValue({
        description: data.description,
        name: data.name,
        price: data.price
      });
    }
    catch(err){
      this.router.navigate(['notFound'])
    }
    

  }

  async onSubmit() {
    let product : Product = {
      ...this.form.value
    };

    if(this.currentId != '0'){
      product.id = this.currentId;

      await lastValueFrom(this.productService.update(this.currentId, product));
    }
    else{
      await lastValueFrom(this.productService.create(product));
    }

    this.router.navigate(['']);
  }

  async deleteItem(){
    await lastValueFrom(this.productService.delete(this.currentId));

    this.router.navigate(['']);
  }

}
