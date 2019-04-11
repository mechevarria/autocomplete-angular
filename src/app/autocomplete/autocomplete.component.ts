import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { Product } from './product';
import { of } from 'rxjs/internal/observable/of';
import { IconDefinition, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  asyncSelected: string;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  selected: Product;
  typeaheadLoading: boolean;
  products: Product[];
  loadingIcon: IconDefinition = faCircleNotch;
  documents: any[];

  constructor(private productService: ProductService) {}

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.selected = e.item;
  }

  search(token: string): Observable<any> {
    let query: RegExp;
    try {
      query = new RegExp(token, 'i');
    } catch (error) {
      query = new RegExp(null, 'i');
    }

    return of(
      this.products.filter((product: any) => {
        return query.test(product.name);
      })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(mergeMap((token: string) => this.search(token)));

    // this.productService.getFireProducts().subscribe(res => {
    //   this.documents = res;
    // });
  }
}
