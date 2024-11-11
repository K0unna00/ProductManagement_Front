import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { ProductDTO } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss'
})
export class CreateProductComponent {
  form: FormGroup;
  currentId: string;
  currentData: ProductDTO;
  selectedFile: File | null = null;
  imgPreview: any;
  isFileInputClicked: boolean;
  constructor(private fb: FormBuilder, private productService: ProductService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', [Validators.required]]
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const maxFileSize = 2 * 1024 * 1024;
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
    formData.append('image', this.selectedFile)     

    await lastValueFrom(this.productService.createProduct(formData));

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
