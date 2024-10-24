import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getApiConfig } from '../../core/store/home.selector';
import { map } from 'rxjs';

@Component({
  selector: '[app-movie-card]',
  standalone: true,
  imports: [],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {
  posterUrl: string = '';
  @Input() data: any;
  private store = inject(Store);

  ngOnInit() :void {
    if (!this.data?.poster_path) {
      this.posterUrl = 'assets/images/no-poster.png';
    } else {
      this.store.select(getApiConfig).pipe(
          map(url => url.poster)
        ).subscribe((path) => {
          this.posterUrl = path + this.data?.poster_path;
      })

    }
  }


}
