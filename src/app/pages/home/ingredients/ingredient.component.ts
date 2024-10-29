import { Component, inject, Input } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { SwitchTabComponent } from "../../../shared/switch-tab/switch-tab.component";
import { CarouselComponent } from "../../../components/carousel/carousel.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient',
  standalone: true,
  imports: [SwitchTabComponent, CarouselComponent, CommonModule],
  templateUrl: './ingredient.component.html',
  styleUrl: './ingredient.component.scss'
})
export class IngredientComponent {
  endPoint: string = '';
  data$ = new BehaviorSubject<any>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  @Input() tabs: string[] = [];
  @Input() type: string = '';
  @Input() defaultTab!: string;

  private homeService = inject(HomeService);

  mapingEndPoint: { [key: string]: string } = {
    'day': 'day',
    'week': 'week',
    'movies': 'movie',
    'TV shows': 'tv',
  }

  ngOnInit() {
    if(!this.endPoint) this.endPoint = this.type == 'Trending' ? 'day' : 'movies';
    this.loadData();
  }

  loadData() {
    this.homeService.getIngredientData(this.mapingEndPoint[this.endPoint], this.type).pipe(
      tap(() => this.loading$.next(true)),
      map((res: any) => res.results)
    ).subscribe((results) => {
      this.data$.next(results);
      this.loading$.next(false);
    })
  }

  handleTabChange(tab: string) {
    this.endPoint = tab;
    this.loadData();
  }


}
