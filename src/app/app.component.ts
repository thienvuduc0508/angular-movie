import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { getApiConfiguration, getGenres } from './core/store/home.actions';
import { CommonModule } from '@angular/common';
import { getGenreSelector } from './core/store/home.selector';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-movie';
  constructor() {}
  protected store = inject( Store);
  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.store.dispatch(getApiConfiguration());
    this.store.dispatch(getGenres({types: 'movie'}));
  }
}
