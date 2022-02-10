export interface IGenre {
    id: number,
    name: string
}

export interface IGenresState {
    genres: IGenre[],
    status: string | null,
    error: string | null
}

// export interface IGenresState {
//     genres: IGenre[],
//     genresNames: string[],
//     status: string | null,
//     error: string | null
// }