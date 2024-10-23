import { Component, inject } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { BehaviorSubject, map, Subject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getApiConfig } from '../../../core/store/home.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  background$ = new BehaviorSubject<string>('');
  loading$ = new Subject<boolean>();
  error$ = new Subject<boolean>();

  private homeService = inject(HomeService);
  private store = inject(Store);
  ngOnInit() {
    this.loadBanner();
  }

  loadBanner() {
    this.loading$.next(true);
    this.error$.next(false);
    try {
      this.store.select(getApiConfig).pipe(
        map(url => url.backdrop),
        switchMap((backdrop) => this.homeService.getUpComming().pipe(
          map((data: any) => backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path)
        ))
      ).subscribe((src: string) => this.background$.next(src));
      
    } catch (error) {
      this.error$.next(true)
    }
    this.loading$.next(false);
  }
}
