import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SanitizeUrlPipe } from '../../core/pipes/santi-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  standalone: true,
  imports: [CommonModule, SanitizeUrlPipe, YouTubePlayerModule],
  templateUrl: './video-popup.component.html',
  styleUrl: './video-popup.component.scss'
})
export class VideoPopupComponent {
  show: boolean = false;
  videoId!: string|number|null;

  constructor(private _sanitizer: DomSanitizer){
    
  }

  sanitizerUrl(url: string) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  openPopup(videoId: any) {
    this.show = true;
    this.videoId = videoId;
  }

  hidePopup() {
    this.show = false;
    this.videoId = null;
  }
}
