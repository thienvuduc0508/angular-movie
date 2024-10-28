import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { IngredientComponent } from "./ingredients/ingredient.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, IngredientComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  trendingTabs = ['day', 'week'];
  popularAndRatedTabs = ['movies', 'TV shows'];

}
