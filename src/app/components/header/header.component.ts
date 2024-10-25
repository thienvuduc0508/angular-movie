import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  show$ = new BehaviorSubject<string>('top');
  lastScrollY$ = new BehaviorSubject<number>(0);
  mobileMenu$ = new BehaviorSubject<boolean>(false);
  showSearch$ = new BehaviorSubject<boolean>(false);

  @HostListener('window:scroll', ['$event'])
  controlNavbar() {
    if(window.scrollY > 200) {
      if(window.scrollY > this.lastScrollY$.value && !this.mobileMenu$.value) {
        this.show$.next('hide');
      } else {
        this.show$.next('top')
      }
    } else {
      this.show$.next('top');
    }
    this.lastScrollY$.next(window.scrollY);
  }



  ngOnInit(): void {
  }


  openSearch() {
    this.mobileMenu$.next(false);
    this.showSearch$.next(true);
  }

  openMobileMenu() {
    this.mobileMenu$.next(true);
    this.showSearch$.next(false);
  }

}
