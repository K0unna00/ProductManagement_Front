import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartState } from '../../store/reducers/cart.reducers';
import { removeFromCart } from '../../store/actions/cart.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',

})
export class ProductDetailComponent {
  form: FormGroup;
  currentId : string;
  currentData : Product;
  selectedFile: File | null = null;
  imgPreview : any;
  isileInputClicked: boolean;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private route : ActivatedRoute,
    private router : Router,
    private store: Store<{ cart: CartState }>
  ) {
  }

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
      if(this.currentId != 'create'){
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
    if(this.currentId != 'create'){
      product.id = this.currentId;
      await lastValueFrom(this.productService.update(this.currentId, product));
    }
    else{
      await lastValueFrom(this.productService.create(product));
    }
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product saved successfully",
      showConfirmButton: false,
      timer: 1500
    });
    this.router.navigate(['']);
  }

  async deleteItem(){
    let id = this.currentId
    this.store.dispatch(removeFromCart({ id}));

    await lastValueFrom(this.productService.delete(this.currentId));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product deleted successfully",
      showConfirmButton: false,
      timer: 1500
    });

    this.router.navigate(['']);
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Please select an image",
          showConfirmButton: false,
          timer: 1500
        });
        return;
      }
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFileInputClicked(){
    this.isileInputClicked = true;
  }

  clearImage(){
    this.selectedFile = null;
  }

}
