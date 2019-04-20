import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { ProductService } from '../autocomplete/product.service';
import { MessageService } from '../message/message.service';
import { DocumentReference } from '@angular/fire/firestore';
import { Product } from '../autocomplete/product';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  products: Product[] = new Array();
  count = 0;
  percent = 0;
  uploaded = 0;
  disabled = true;
  collection = 'products';
  isCancelled = false;

  constructor(private messageService: MessageService, private uploadService: UploadService, private productService: ProductService) {}

  toggleCancel(): void {
    this.isCancelled = !this.isCancelled;
    this.messageService.info(`isCancelled = ${this.isCancelled}`);
  }

  doUpload() {
    this.disabled = true;
    this.recursiveUpload(this.products);
  }

  recursiveUpload(products: Product[]) {
    if (this.isCancelled || products.length === 0) {
      this.disabled = false;
      return true;
    } else {
      this.uploadService
        .upload(products[0], this.collection)
        .then((ref: DocumentReference) => {
          this.uploaded++;
          this.percent = (this.uploaded / this.count ) * 100;
          this.products.shift();
          this.recursiveUpload(products);
        })
        .catch(err => this.messageService.error(err));
    }
  }

  ngOnInit() {
    this.productService.getProductsLocal().subscribe(res => {
      this.count = res.length;
      this.products = res;
      this.disabled = false;
    });
  }
}
