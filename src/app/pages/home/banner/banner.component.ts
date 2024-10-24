import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { HomeService } from '../../../core/services/home.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { getApiConfig } from '../../../core/store/home.selector';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  background$ = new BehaviorSubject<string>('');
  loading$ = new Subject<boolean>();
  error$ = new Subject<boolean>();

  query$ = new BehaviorSubject<string>('');
  searchInput = new FormControl();

  private homeService = inject(HomeService);
  private store = inject(Store);
  private router = inject(Router);
  ngOnInit() {
    this.loadBanner();
    this.searchInput.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter(Boolean)
    ).subscribe((val: string) => this.query$.next(val))
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

  handleKeyUp(e: KeyboardEvent) {
    if(e.key === 'Enter') {
      this.submitSearch();
    }
  }

  submitSearch() {
    if(this.query$.value.length) {
      this.router.navigate(['/search', this.query$.value])
    }
  }

}
