import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';
import { ProductService } from '../autocomplete/product.service';
import { MessageService } from '../message/message.service';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  split: any[] = new Array();
  batch = 1000;
  count = 0;
  percent = 0;
  percentChunk = 0;
  disabled = true;
  collection = 'json';
  isCancelled = false;

  constructor(private messageService: MessageService, private uploadService: UploadService, private productService: ProductService) {}

  toggleCancel(): void {
    this.isCancelled = !this.isCancelled;
    this.messageService.info(`isCancelled = ${this.isCancelled}`);
  }

  doUpload() {
    this.disabled = true;
    this.recursiveUpload(this.split);
  }

  recursiveUpload(splitArray: any) {
    if (this.isCancelled || splitArray.length === 0) {
      this.disabled = false;
      return true;
    } else {
      this.uploadService
        .upload(splitArray[0], this.collection)
        .then((ref: DocumentReference) => {
          this.percent = this.percent + this.percentChunk;
          this.messageService.success(`Uploaded. Document id is ${ref.id}`);
          splitArray.shift();
          this.recursiveUpload(splitArray);
        })
        .catch(err => this.messageService.error(err));
    }
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.count = res.length;

      while (res.length > 0) {
        if (res.length < this.batch) {
          this.split.push({
            products: res.splice(0, res.length)
          });
        } else {
          this.split.push({
            products: res.splice(0, this.batch)
          });
        }
      }
      this.percentChunk = 100 / this.split.length;
      this.disabled = false;
    });
  }
}
