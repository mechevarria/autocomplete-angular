import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routes';
import { BsDropdownModule, CollapseModule } from 'ngx-bootstrap';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryApiService } from './in-memory-api.service';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { UploadComponent } from './upload/upload.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

const config = {
  apiKey: window['_env'].apiKey,
  authDomain: 'autocomplete-d62e3.firebaseapp.com',
  databaseURL: 'https://autocomplete-d62e3.firebaseio.com',
  projectId: 'autocomplete-d62e3',
  storageBucket: 'autocomplete-d62e3.appspot.com',
  messagingSenderId: '941808097489'
};

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent, BreadcrumbComponent, SidebarComponent, AutocompleteComponent, UploadComponent],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      progressBar: true
    }),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryApiService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true
    }),
    TypeaheadModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
