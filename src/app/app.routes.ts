import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFound } from './pages/404/page-404.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '**', component: PageNotFound},
];
