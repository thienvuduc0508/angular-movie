import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { LoaderComponent } from "../../shared/loader/loader.component";
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../core/services/home.service';
import { SearchResult } from '../../core/models/home.model';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component"; 

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [CommonModule, LoaderComponent, InfiniteScrollModule, MovieCardComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.scss'
})
export class SearchResultComponent {
  loadingInit$ = new BehaviorSubject<boolean>(false);
  data$ = new BehaviorSubject<any>([]);
  pageIndex$ = new BehaviorSubject<number>(1);
  query$ = new BehaviorSubject<string>('');
  hasMorePage$ = new BehaviorSubject<boolean>(false);
  loadingMore$ = new BehaviorSubject<boolean>(false);

  private route = inject(ActivatedRoute);
  private homeService = inject(HomeService);

  ngOnInit(): void {
    this.initData();
    
  }

  onScroll() {
    this.loadMorePage();
  }

  initData() {
    this.route.params.pipe(
      tap(() => this.loadingInit$.next(true)),
      switchMap(({ query }) => {
        this.query$.next(query)
        return this.homeService.searchQuery(this.pageIndex$.value, query)
      })
    ).subscribe((data: SearchResult) => {
      this.data$.next(data.data);
      this.hasMorePage$.next(data.hasMorePages);
      this.pageIndex$.next(data.page + 1);
      this.loadingInit$.next(false);
    }
    )
  }

  loadMorePage() {
    if(this.hasMorePage$.value) {
      this.loadingMore$.next(true);
      this.homeService.searchQuery(this.pageIndex$.value, this.query$.value).subscribe((data: SearchResult) => {
        this.data$.next([...this.data$.getValue(), ...data.data]);
        this.hasMorePage$.next(data.hasMorePages);
        this.pageIndex$.next(data.page + 1);
        this.loadingMore$.next(false);
      })
    }
  }

}
