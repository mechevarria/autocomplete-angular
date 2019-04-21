import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localUrl = 'assets/data/products.json';
  private mockUrl = 'api/productsMock';

  constructor(private messageService: MessageService, private http: HttpClient, private firestore: AngularFirestore) { }

  getProductsLocal(): Observable<Product[]> {
    return this.http.get<Product[]>(this.localUrl).pipe(catchError(err => this.handleError('getProducts', err)));
  }

  getProductsMock(token: string): Observable<Product[]> {
    let query: RegExp;
    if (token === null || token.length < 2) {
      return of(null);
    } else {
      query = new RegExp(token, 'i');
    }
    return this.http.get<Product[]>(this.mockUrl).pipe(
      map((products: Product[]) => products.filter((product: Product) => {
        return query.test(product.name);
      }),
        catchError(err => this.handleError('getProducts', err))
      ));
  }

  getFireDocs(token: string, limit: number): Observable<any> {
    if (token == null || token.length < 2) {
      return of(null);
    } else {
      return this.firestore
        .collection('products', ref => ref.where('name', '>', token).limit(limit))
        .valueChanges()
        .pipe(catchError(err => this.handleError('getProducts', err)));
    }
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
