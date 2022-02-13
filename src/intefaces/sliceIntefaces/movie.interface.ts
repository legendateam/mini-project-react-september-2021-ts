export interface IMovies {
    movies: IResultsMovie[],
    moviesWithGenre: IResultsMovie[],
    movieDetail: IMovieDetail | null,
    pageQ: null | number,
    movie: IResultsMovie | null,
    id: null | number,
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

export interface IMovieDetail {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: null,
    budget: boolean,
    genres: [
        {
            id: number,
            name: string
        },
    ],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview:  string
    popularity: number,
    poster_path: string,
    production_companies: ICompany [],
    production_countries: ICountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: [
        {
            english_name: string,
            iso_639_1: string,
            name: string
        }
    ],
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count:number,
    videos: {
    results: IVideos[]
    }
}

export interface ICompany {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
}

export interface ICountry {
    iso_3166_1:string,
    name: string
}

export interface IVideos{
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    published_at: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    id: string
}

