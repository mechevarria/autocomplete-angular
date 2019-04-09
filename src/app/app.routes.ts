import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {TableComponent} from './table/table.component';
import {ChartsComponent} from './charts/charts.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

export const AppRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      breadcrumb: 'Home'
    },
    children: [
      {
        path: 'charts',
        component: ChartsComponent,
        data: {
          breadcrumb: 'Charts'
        }
      },
      {
        path: 'table',
        component: TableComponent,
        data: {
          breadcrumb: 'Table'
        }
      },
      {
        path: 'autocomplete',
        component: AutocompleteComponent,
        data: {
          breadcrumb: 'Auto-Complete'
        }
      }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
