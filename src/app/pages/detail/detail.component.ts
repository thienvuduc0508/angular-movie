import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, switchMap, tap } from 'rxjs';
import { DetailService } from '../../core/services/details.service';
import { DetailBannerComponent } from "./detail-banner/detail-banner.component";
import { CommonModule } from '@angular/common';
import { CastComponent } from "./cast/cast.component";
import { SimilarComponent } from "./similar/similar.component";

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [DetailBannerComponent, CommonModule, CastComponent, SimilarComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent {

  private route = inject(ActivatedRoute);
  private detailService = inject(DetailService);

  video$ = new BehaviorSubject<any>({});
  credit$ = new BehaviorSubject<any>({});
  loading$ = new BehaviorSubject<boolean>(false);
  mediaType: string = '';
  id: number = 0;

  ngOnInit():void {
    this.route.params.pipe(
      tap(() => this.loading$.next(true)),
      switchMap(({mediaType, id}) => {
        this.mediaType = mediaType;
        this.id = id;
        return forkJoin([this.detailService.getVideoData(mediaType, id), this.detailService.getCredits(mediaType, id)])
      })
    ).subscribe(([videoData, creditsData]) => {
      this.video$.next(videoData);
      this.credit$.next(creditsData);
      this.loading$.next(false);
    })
  }

}
