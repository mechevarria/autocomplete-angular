import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../autocomplete/product';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private db: AngularFirestore) {}

  upload(product: Product): Promise<DocumentReference> {
    return this.db.collection('products').add(product);
  }
}
