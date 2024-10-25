import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class ExploreService extends BaseService {

    private http = inject(HttpClient)

    getGenres(type: 'tv'|'movie') {
        return this.http.get(`${this.BASE_URL}/genre/${type}/list`)
    }

    getExplore(type: 'tv'|'movie', pageIndex: number, options: any) {
        return this.http.get(`${this.BASE_URL}/discover/${type}?page=${pageIndex}`, {params: options});
    }

}