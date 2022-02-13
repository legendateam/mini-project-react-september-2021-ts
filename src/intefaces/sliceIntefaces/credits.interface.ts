export interface ICreditsState {
    credits: ICredit[] | null,
    status: string | null,
    error: string| null
}
export interface ICredits {
    id: number,
    cast:  ICredit[]
}

export interface ICredit {
    adult: false,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

