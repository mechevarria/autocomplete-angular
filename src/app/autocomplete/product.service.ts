import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
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
    try {
      query = new RegExp(token, 'i');
    } catch (error) {
      query = new RegExp(null, 'i');
    }
    return this.http.get<Product[]>(this.mockUrl).pipe(
      map((products: Product[]) => products.filter((product: Product) => {
        return query.test(product.name);
      }),
        catchError(err => this.handleError('getProducts', err))
      ));
  }

  getFireDocs(token: string): Observable<any> {
    return this.firestore
      .collection('products', ref => ref.where('name', '>', token))
      .valueChanges()
      .pipe(catchError(err => this.handleError('getProducts', err)));
  }

  private handleError(method: string, res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`${method} ${res.message}`);
    console.error(res.error);
    return of(null);
  }
}
