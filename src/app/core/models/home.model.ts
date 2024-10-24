
export interface URL {
    backdrop: string;
    poster: string;
    profile: string;
}

export interface Genres {
    id: string;
    name: string;
}
export interface HomeModel {
    url: URL;
    genres: Genres[]
}

export interface SearchResult {
    data: any[];
    page: number;
    hasMorePages: boolean;
}