import { createFeatureSelector, createSelector } from "@ngrx/store";

const getHomeState = createFeatureSelector('home');

export const getApiConfig = createSelector(getHomeState, (state: any) => state.url);
export const getGenreSelector = createSelector(getHomeState, (state: any) => state.genres);