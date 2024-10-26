import { Component, inject } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { SwitchTabComponent } from "../../../shared/switch-tab/switch-tab.component";
import { CarouselComponent } from "../../../components/carousel/carousel.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [SwitchTabComponent, CarouselComponent, CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss'
})
export class TrendingComponent {
  endPoint: 'day'|'week' = 'day';
  data$ = new BehaviorSubject<any>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  private homeService = inject(HomeService);

  ngOnInit() {
    this.loadTrending();

  }

  loadTrending() {
    this.homeService.getTrending(this.endPoint).pipe(
      tap(() => this.loading$.next(true)),
      map((res: any) => res.results)
    ).subscribe((results) => {
      this.data$.next(results);
      this.loading$.next(false);
    })
  }

  handleTabChange(tab: 'day'|'week') {
    this.endPoint = tab;
    this.loadTrending();
  }


}
