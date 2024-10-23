import { Injectable } from "@angular/core";

import { apiConfig } from "../../../environments/environment.prod";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
}
)

export class BaseService {
    BASE_URL!: string;
    constructor() {
        this.BASE_URL = apiConfig.BASE_URL;
    }
}