import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getGenreSelector } from '../../core/store/home.selector';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent {
  @Input() data: any[] = [];
  genres: any[] = [];
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select(getGenreSelector).subscribe((value) => this.genres = value.genres);
  }

  getGenresFromId(id: number) {
    let name = ''
    this.genres.map((g) => {
      if(g.id == id) name = g.name;
    })
    return name;
  }
}
