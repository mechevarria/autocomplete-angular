import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { ProductService } from '../autocomplete/product.service';
import { Product } from '../autocomplete/product';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  products: Product[];
  count = 0;
  fireCount = 0;
  percent = 0;
  disabled = true;
  constructor(private uploadService: UploadService, private productService: ProductService) {}

  doUpload() {
    let complete = 0;
    this.percent = 0;
    this.products.forEach(product => {
      this.uploadService.upload(product).then(() => {
        complete++;
        this.percent = (complete / this.count) * 100;
      });
    });
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
      this.count = this.products.length;
      this.disabled = false;
    });

    this.productService.getFireProducts().subscribe(res => {
      this.fireCount = res.length;
    });
  }
}
