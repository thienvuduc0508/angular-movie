import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HomeService } from "../services/home.service";
import { getApiConfiguration, getApiConfigurationSuccess, getGenres, getGenresSuccess } from "./home.actions";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Injectable()

export class HomeEffects {
    constructor() { }
    private actions$ = inject(Actions);
    private homeService = inject(HomeService); 
    getApiConfig$ = createEffect(() => this.actions$.pipe(
        ofType(getApiConfiguration),
        exhaustMap(() => this.homeService.fetchApiConfig().pipe(
            map((url: any) => url?.images),
            map(url => getApiConfigurationSuccess({ url })),
            catchError(() => EMPTY)
        ))
    ))

    getGenres$ = createEffect(() => this.actions$.pipe(
        ofType(getGenres),
        exhaustMap(({ types }) => this.homeService.fetchGenres(types).pipe(
            map(genres => getGenresSuccess({ genres })),
            catchError(() => EMPTY)
        ))
    ))
}