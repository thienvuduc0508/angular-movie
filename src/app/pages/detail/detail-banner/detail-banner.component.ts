import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { DetailService } from '../../../core/services/details.service';
import { Store } from '@ngrx/store';
import { getApiConfig } from '../../../core/store/home.selector';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { VarDirective } from '../../../core/directives/var.directive';
import { FormatDatePipe } from '../../../core/pipes/format-date.pipe';
import { GenresComponent } from "../../../components/genres/genres.component";
import { CircleProgressComponent } from "../../../shared/circle-progress/circle-progress.component";
import { VideoPopupComponent } from "../../../shared/video-popup/video-popup.component";

@Component({
  selector: 'app-detail-banner',
  standalone: true,
  imports: [CommonModule, VarDirective, FormatDatePipe, GenresComponent, CircleProgressComponent, VideoPopupComponent],
  templateUrl: './detail-banner.component.html',
  styleUrl: './detail-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailBannerComponent implements OnChanges {
  @Input() video: any = {};
  @Input() crew: any = {};
  @Input() mediaType!: string;
  @Input() id!: number;

  @ViewChild('videoPopup') videoPopup: VideoPopupComponent;

  backdropSrc: string = '';
  posterSrc: string = '';
  url: string = '';
  data$ = new BehaviorSubject<any>({});
  loading$ = new BehaviorSubject<boolean>(false);
  fallBackImg = 'assets/images/no-poster.png';
  genres: any;
  director: any[] = [];
  writer: any[] = [];

  private detailService = inject(DetailService);
  private store = inject(Store);
  ngOnInit(): void {
    // this.loadInit();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    window.scrollTo(0,0);
    if(changes['crew']) {
      this.director = this.crew?.filter((f: any) => f.job == 'Director');
      this.writer = this.crew?.filter(
        (f: any) => ['Screenplay', 'Story', 'Writer'].indexOf(f.job) > -1 
      )
    }
    this.loadInit();
  }

  loadInit() {
    this.store.select(getApiConfig).pipe(
      tap(() => this.loading$.next(true)),
      map(url => url.backdrop),
      switchMap((url) => {
        this.url = url;
        return this.detailService.getDetailData(this.mediaType, this.id)
      })
    ).subscribe((data: any) => {
      this.backdropSrc = this.url + data.backdrop_path;
      this.posterSrc = data.poster_path ? this.url + data.poster_path : this.fallBackImg;
      this.genres = data?.genres?.map((g: any) => g.id);
      this.data$.next(data);
      this.loading$.next(false);
    })
  }

  toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? `${minutes}m` : ""}`;
  }

  openTrailer() {
    this.videoPopup.openPopup(this.video.key);
  }
}
