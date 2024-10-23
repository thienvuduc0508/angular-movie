import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { homeReducer } from './core/store/home.reducer';
import { HomeEffects } from './core/store/home.effects'
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/services/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideState({ name: 'home', reducer: homeReducer }),
    provideEffects([HomeEffects])
  ]
};
