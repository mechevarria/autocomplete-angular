import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from './product';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localUrl = 'assets/data/products.json';

  constructor(private messageService: MessageService, private http: HttpClient, private firestore: AngularFirestore) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.localUrl).pipe(catchError(err => this.handleError('getProducts', err)));
  }

  getFireDocs() {
    return this.firestore
      .collection('json')
      .valueChanges()
      .pipe(catchError(err => this.handleError('getProducts', err)));
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
