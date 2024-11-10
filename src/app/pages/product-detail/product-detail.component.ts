import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product, ProductDTO } from '../../models/product.model';
import { from, lastValueFrom } from 'rxjs';
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
  currentId: string;
  currentData: ProductDTO;
  selectedFile: File | null = null;
  imgPreview: any;
  isFileInputClicked: boolean;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ cart: CartState }>
  ) {
  }

  ngOnInit(): void {
    this.setupForm();
    this.getParams();
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]]
    });
  }

  getParams() {
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('id');
      if (this.currentId != 'create') {
        this.getProductById(this.currentId);
      }
    });
  }

  async getProductById(id: string) {
    try {
      let data = await lastValueFrom(this.productService.getById(id));
      this.currentData = data;
      this.form.patchValue({
        description: data.description,
        name: data.name,
        price: data.price,
        image: data.imgBase64
      });

      this.imgPreview = 'data:image/png;base64,' + this.currentData.imgBase64;
      
      this.isFileInputClicked = true;
    }
    catch (err) {
      console.log(err);

      // this.router.navigate(['notFound'])
    }
  }

  async deleteItem() {
    let id = this.currentId
    this.store.dispatch(removeFromCart({ id }));

    await lastValueFrom(this.productService.deleteProduct(this.currentId));

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
      this.showImgPreview(file);

      this.form.get("image").setValue(file)
    }
  }

  showImgPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onFileInputClicked() {
    this.isFileInputClicked = true;
  }

  clearImage() {
    this.selectedFile = null;
    this.imgPreview = null;
    this.form.get("image").setValue('')
  }

  async onSubmit() {
    const formData = new FormData();

    formData.append('name', this.form.get('name')?.value);
    formData.append('description', this.form.get('description')?.value);
    formData.append('price', this.form.get('price')?.value);
    formData.append('image', this.selectedFile)

    if (this.currentId != 'create') {
      formData.append('id', this.currentId)
      await lastValueFrom(this.productService.updateProduct(this.currentId, formData));
    }
    else {
      await lastValueFrom(this.productService.createProduct(formData));
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

}
