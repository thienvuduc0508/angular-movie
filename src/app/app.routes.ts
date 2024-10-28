import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFound } from './pages/404/page-404.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search/:query', loadComponent: () => import('./pages/search-result/search-result.component').then(m => m.SearchResultComponent)},
    {path: 'explore/:type', loadComponent: () => import('./pages/explore/explore.component').then(m => m.ExploreComponent)},
    {path: 'detail/:mediaType/:id', loadComponent: () => import('./pages/detail/detail.component').then(m => m.DetailComponent)},
    {path: '**', loadComponent: () => import('./pages/404/page-404.component').then(m => m.PageNotFound)},
];
