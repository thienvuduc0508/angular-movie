import { Component } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { TrendingComponent } from "./trending/trending.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, TrendingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
