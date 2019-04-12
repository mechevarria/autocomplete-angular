import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../autocomplete/product';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private db: AngularFirestore) {}

  upload(data: any): Promise<DocumentReference> {
    return this.db.collection('json').add(data);
  }
}
