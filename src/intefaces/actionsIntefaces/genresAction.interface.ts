import {IGenre} from '../sliceIntefaces/genre.interface';

export interface IGenresAction {
    genres: IGenre[]
}

export interface IGenreName {
    genreName: string
}

export interface ISortBy {
    sortBy: string
}
