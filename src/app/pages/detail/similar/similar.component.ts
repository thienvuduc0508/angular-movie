import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CarouselComponent } from '../../../components/carousel/carousel.component';
import { BehaviorSubject, tap } from 'rxjs';
import { DetailService } from '../../../core/services/details.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-similar',
  standalone: true,
  imports: [CarouselComponent, CommonModule],
  templateUrl: './similar.component.html',
  styleUrl: './similar.component.scss'
})
export class SimilarComponent implements OnChanges {

  @Input() mediaType: string = '';
  @Input() id: number = 0;

  private detailService = inject(DetailService)

  data$ = new BehaviorSubject<any>({});
  loading$ = new BehaviorSubject<boolean>(false);
  title: string = '';

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['mediaType'] || changes['id']) {
        this.title = this.mediaType == 'tv' ? 'Similar TV Shows': 'Similar Movies';
        this.detailService.getSimilar(this.mediaType, this.id).pipe(
          tap(() => this.loading$.next(true))
        ).subscribe((res) => {
          this.data$.next(res);
          this.loading$.next(false);
        })
      }
  }

}
