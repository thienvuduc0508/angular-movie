import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, concatMap, forkJoin, switchMap, tap } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ExploreService } from '../../core/services/explore.service';
import { sortData } from '../../utils';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoaderComponent,
    InfiniteScrollModule,
    MovieCardComponent
  ],
  templateUrl: './explore.component.html',
  styleUrl: './explore.component.scss'
})
export class ExploreComponent {
  data$ = new BehaviorSubject<any>({});
  genresList$ = new BehaviorSubject<any>({});
  filter$ = new BehaviorSubject<any>({});
  mediaType: 'tv' | 'movie';
  loading$ = new BehaviorSubject<boolean>(false);
  page$ = new BehaviorSubject<number>(1);
  totalPage$ = new BehaviorSubject<number>(1);
  filterOptions = sortData;

  genresSelect: string = ''

  ngOnInit(): void {
    this.initData();
  }

  private route = inject(ActivatedRoute);
  private exploreService = inject(ExploreService);


  initData() {
    this.filter$.next({});
    this.route.params.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(({ type }) => {
        this.mediaType = type;
        return forkJoin([
          this.exploreService.getGenres(type),
          this.exploreService.getExplore(type, this.page$.value, this.filter$.value)
        ])
      })
    ).subscribe(([genresData, exploreData]) => {
      this.genresList$.next(genresData);
      this.data$.next(exploreData);
      this.page$.next(this.page$.value + 1);
      this.loading$.next(false);
    })

  }

  loadMorePage() {
    if (this.data$.value.page < this.data$.value.total_pages) {
      this.exploreService.getExplore(this.mediaType, this.page$.value, this.filter$.value).subscribe((res: any) => {
        this.data$.next({
          ...this.data$.getValue(),
          results: [...this.data$.value.results, ...res?.results]
        });
        this.page$.next(this.page$.value + 1);
      })
    }

  }

  onScroll() {
    this.loadMorePage();
  }

  onSelectChange(e: any, type: string) {
    this.filter$.next({
      ...this.filter$.value,
      [type]: e.target.value
    });
    this.loading$.next(true);
    this.page$.next(1);
    return this.exploreService.getExplore(this.mediaType, this.page$.value, this.filter$.value).subscribe((res) => {
      this.data$.next(res);
      this.loading$.next(false);
    })
  }

}
