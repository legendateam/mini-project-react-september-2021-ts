import axiosInstance from "./axios.cervice";
import {urls} from "../configs";
import {IMovie} from "../intefaces";

import {QueryParamsEnum} from "../enums";

const moviesService = {
    getAll: ()=> axiosInstance.get<IMovie>(`${urls.discover}${urls.movie}${urls.key}`),
    getListWithGenre: (id:number)=> axiosInstance.get<IMovie>(`${urls.discover}${urls.movie}${urls.key}${QueryParamsEnum.comma}${QueryParamsEnum.with_genres}${id}`)
};

export {moviesService}