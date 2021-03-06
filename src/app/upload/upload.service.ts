import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Product } from '../autocomplete/product';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private db: AngularFirestore) {}

  upload(data: any, collection: string): Promise<DocumentReference> {
    return this.db.collection(collection).add(data);
  }
}
