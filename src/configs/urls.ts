import {IUrls} from "../intefaces";

const baseURL = 'https://api.themoviedb.org/3';

const urls:IUrls = {
    discover: '/discover',
    movie: '/movie',
    genre: '/genre',
    list: '/list',
    find: '/find',
    credits: '/credits',
    images: '/images',
    watch: '/watch',
    providers: '/providers',
    regions: '/regions',
    key: '?api_key=eb0ad9008e4a444b2fc710f3e05a3ea9',
    poster: 'https://image.tmdb.org/t/p/original',
    posterW500: 'https://image.tmdb.org/t/p/w500'
}

export default baseURL;
export {urls}