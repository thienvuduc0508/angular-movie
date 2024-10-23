import { createReducer, on } from "@ngrx/store";
import { getApiConfigurationSuccess, getGenres, getGenresSuccess } from "./home.actions";
import { HomeModel } from "../models/home.model";

const inititalState: HomeModel = {
    url: {
        backdrop: '',
        poster: '',
        profile: ''
    },
    genres: []
}
export const homeReducer = createReducer(inititalState,
    on(getApiConfigurationSuccess, (state, { url }) => ({ ...state, url: {
        backdrop: url?.secure_base_url + 'original',
        poster: url?.secure_base_url + 'original',
        profile: url?.secure_base_url + 'original'
    }})),
    on(getGenresSuccess, (state, { genres }) => ({ ...state, genres }))

)