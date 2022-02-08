import {IUrls} from "../intefaces/configsInterfaces/urls.interface";

const baseURL = 'https://api.themoviedb.org/3';

const urls:IUrls = {
    discover: 'discover',
    movie: 'movie',
    genre: 'genre',
    list: 'list',
    find: 'find',
    credits: 'credits',
    images: 'images'
}

export default baseURL