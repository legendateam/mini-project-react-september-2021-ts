export interface IProvidersRegions {
    results: IProviderObject[],
    status: string | null,
    error: string | null
}

export interface IProviderObject {
    iso_3166_1: string,
    english_name: string,
    native_name: string
}