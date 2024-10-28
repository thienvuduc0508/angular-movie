import { inject, Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class DetailService extends BaseService {
    private http = inject(HttpClient);

    getDetailData(mediaType: string, id: number) {
        return this.http.get(`${this.BASE_URL}/${mediaType}/${id}`);
    }

    getVideoData(mediaType: string, id: number) {
        return this.http.get(`${this.BASE_URL}/${mediaType}/${id}/videos`);
    }

    getCredits(mediaType: string, id: number) {
        return this.http.get(`${this.BASE_URL}/${mediaType}/${id}/credits`);
    }
    getSimilar(mediaType: string, id: number) {
        return this.http.get(`${this.BASE_URL}/${mediaType}/${id}/similar`);
    }
}