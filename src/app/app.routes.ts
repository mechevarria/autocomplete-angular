import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { UploadComponent } from './upload/upload.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'autocomplete',
        component: AutocompleteComponent,
        data: {
          breadcrumb: 'Auto-Complete'
        }
      },
      {
        path: 'upload',
        component: UploadComponent,
        data: {
          breadcrumb: 'Upload'
        }
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
