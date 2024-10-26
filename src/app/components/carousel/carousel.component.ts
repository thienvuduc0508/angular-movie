import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map } from 'rxjs';
import { getApiConfig } from '../../core/store/home.selector';
import { GenresComponent } from "../genres/genres.component";
import dayjs from 'dayjs';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, GenresComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent {
@Input() title: string = '';
@Input() data: any[] = [];
@Input() loading: boolean | null = false;
@ViewChild('carouselContainer') carouselContainer: ElementRef;

url: string = '';
fallback: string = 'assets/images/no-poster.png';

private store = inject(Store);
ngOnInit() {
  this.store.select(getApiConfig).pipe(
    map((url) => url?.poster)
  ).subscribe(res => this.url = res);
}

formatDate(date: string | Date) {
  return dayjs(date).format("MMM D, YYYY");
}

scrollNavigation(direction: string) {
  const container = this.carouselContainer.nativeElement;
  const scrollAmount = container.clientWidth + 20;
  if(direction == 'left'){
    this.carouselContainer.nativeElement.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  } else {
    this.carouselContainer.nativeElement.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }
}
}
