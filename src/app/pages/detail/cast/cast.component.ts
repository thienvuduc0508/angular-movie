import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { getApiConfig } from '../../../core/store/home.selector';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cast.component.html',
  styleUrl: './cast.component.scss'
})
export class CastComponent {
@Input() loading: boolean | null = false;
@Input() data!: any;

srcImg: string = '';
fallBack: string = 'assets/images/avatar.png'
private store = inject(Store);

ngOnInit() {
  this.store.select(getApiConfig).pipe(
    map((url) => url.profile)
  ).subscribe((path) => this.srcImg = path)
}

}
