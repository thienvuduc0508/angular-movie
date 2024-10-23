import { HttpClient, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";

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
}