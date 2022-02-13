import axiosInstance from './axios.cervice';
import {urls} from '../configs';
import {IMovie, IMovieDetail} from '../intefaces';

import {QueryParamsEnum} from '../enums';

const moviesService = {
    getAll: ()=> axiosInstance.get<IMovie>(`${urls.discover}${urls.movie}${urls.key}`),
    getListWithGenre: (id:number)=> axiosInstance.get<IMovie>
    (`${urls.discover}${urls.movie}${urls.key}${QueryParamsEnum.comma}${QueryParamsEnum.with_genres}${id}`),
    getAllWithPage: (id:number) => axiosInstance.get<IMovie>
    (`${urls.discover}${urls.movie}${urls.key}${QueryParamsEnum.comma}${QueryParamsEnum.page}${id}`),
    getWithGenreAndPage: (genre:number, page:number) => axiosInstance.get<IMovie>
    (`${urls.discover}${urls.movie}${urls.key}${QueryParamsEnum.comma}${QueryParamsEnum.with_genres}${genre}${QueryParamsEnum.comma}${QueryParamsEnum.page}${page}`),
    getMovieDetails: (id:number) => axiosInstance.get<IMovieDetail>
    (`${urls.movie}/${id}${urls.key}${QueryParamsEnum.comma}${QueryParamsEnum.append_to_response_videos}`)
};

export {moviesService}