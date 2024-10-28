import { HttpClient, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { map } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class HomeService extends BaseService {
    private http = inject(HttpClient);

    fetchApiConfig() {
        return this.http.get(`${this.BASE_URL}/configuration`);
    }

    fetchGenres(type: string) {
        return this.http.get(`${this.BASE_URL}/genre/${type}/list`);
    }

    getUpComming() {
        return this.http.get(`${this.BASE_URL}/movie/upcoming`);
    }

    searchQuery(index: number, query: string) {
        return this.http.get(`${this.BASE_URL}/search/multi?query=${query}&page=${index}`).pipe(
            map((response: any) => ({
                data: response?.results,
                page: response?.page,
                hasMorePages: response?.page < response?.total_pages,
            }))
        )
    }

    getIngredientData(endPoint: string, type: string) {
        switch (type) {
            case 'Trending':
                return this.http.get(`${this.BASE_URL}/trending/movie/${endPoint}`);
            case 'What Popular':
                return this.http.get(`${this.BASE_URL}/${endPoint}/popular`);
            case 'Top Rated':
                return this.http.get(`${this.BASE_URL}/${endPoint}/top_rated`);
            default: return EMPTY;
        }
    }
}