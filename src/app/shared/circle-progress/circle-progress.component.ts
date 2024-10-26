import { Component, Input } from '@angular/core';
import {RoundProgressComponent} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-round-progress',
  standalone: true,
  imports: [RoundProgressComponent],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent {
  @Input() current: number = 0;
  @Input() color: string = '';
}
