export interface IGenre {
    id: number,
    name: string
}

export interface IGenresState {
    genres: IGenre[],
    id: number | null,
    status: string | null,
    error: string | null
}
