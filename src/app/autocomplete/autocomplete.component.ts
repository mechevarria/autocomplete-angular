import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Observable } from 'rxjs/internal/Observable';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { Product } from './product';
import { IconDefinition, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  asyncSelected: string;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  selected: Product;
  typeaheadLoading: boolean;
  products: Product[] = new Array();
  loadingIcon: IconDefinition = faCircleNotch;
  optionsLimit = 7;

  constructor(private productService: ProductService) { }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.selected = e.item;
  }

  search(token: string, limit: number): Observable<any> {
    // return this.productService.getProductsMock(token);
    return this.productService.getFireDocs(token, limit);
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  ngOnInit() {
    this.dataSource = Observable.create((observer: any) => {
      // Runs on every search
      observer.next(this.asyncSelected);
    }).pipe(mergeMap((token: string) => this.search(token, this.optionsLimit)));
  }
}
