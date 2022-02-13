import axiosInstance from './axios.service';
import {urls} from '../configs';
import {IGenresService} from '../intefaces';

const genresService = {
    getALL: ()=> axiosInstance.get<IGenresService>(`${urls.genre}${urls.movie}${urls.list}${urls.key}`)
}

export {genresService}