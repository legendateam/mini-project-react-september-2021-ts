export interface IMovies {
    movies: IResultsMovie[],
    moviesWithGenre: IResultsMovie[],
    pageQ: null | number,
    status: null | string,
    error: null | string
}

export interface IMovie {
    page: number,
    results: IResultsMovie[]
}

export interface IResultsMovie {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}


