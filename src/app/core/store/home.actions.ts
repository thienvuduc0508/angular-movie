import { createAction, props } from '@ngrx/store';

export const getApiConfiguration = createAction('[Home] API Configuration');
export const getApiConfigurationSuccess = createAction('[Home] API Configuration Success', props<{url: any}>());
export const getGenres = createAction('[Home] Get Genres', props<{types: any}>());
export const getGenresSuccess = createAction('[Home] Get Genres Success', props<{genres: any}>());