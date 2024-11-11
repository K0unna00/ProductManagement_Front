import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductDTO } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { removeFromCart } from '../../store/actions/cart.actions';
import { CartState } from '../../store/reducers/cart.reducers';
import { FilePaths } from '../../constants/FilePath';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
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
        image: data.imgName
      });

      this.imgPreview = FilePaths.MAIN_FILE_PATH + this.currentData.imgName;

      this.isFileInputClicked = true;
    }
    catch (err) {
      console.log(err);
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
    const maxFileSize = 2 * 1024 * 1024;
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

      if (file.size > maxFileSize) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "File's size cant be more than 2mb",
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
    formData.append('image', this.selectedFile);
    formData.append('id', this.currentId);
    formData.append('imgName', this.currentData.imgName);

    await lastValueFrom(this.productService.updateProduct(this.currentId, formData));

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
